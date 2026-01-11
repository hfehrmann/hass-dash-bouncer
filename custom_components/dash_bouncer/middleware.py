"""Define backend middlewares."""
import logging
from collections.abc import Callable
from typing import Any, cast

from homeassistant.components.websocket_api.connection import ActiveConnection
from homeassistant.components.websocket_api.const import DOMAIN as WS_DOMAIN
from homeassistant.core import HomeAssistant, callback

from .config import BounceOption, Config
from .const import DOMAIN, PERMANENT_PANELS

_LOGGER = logging.getLogger(__name__)

type SendMessageFunc = Callable[[HomeAssistant, ActiveConnection, dict[str, Any]], None]

def patch_panel_list_ws(hass: HomeAssistant) -> None:
    """Set middleware for 'get_panels' WS endpoint."""

    class DashBouncerFilterPanelActiveConnection:
        """Wrapper for connection that filer restricted panels."""

        __slots__ = [
            "hass",
            "original_connection",
        ]

        def __init__(
            self,
            hass: HomeAssistant,
            connection: ActiveConnection
        ) -> None:
            self.hass = hass
            self.original_connection = connection

        def __getattr__(self, name: str): # noqa: ANN204
            return getattr(self.original_connection, name)

        def send_message(self, data: dict[str, Any]) -> None:
            user = self.original_connection.user
            username = next(
                (
                    c.data["username"]
                    for c in user.credentials if "username" in c.data
                ),
                None
            )
            config = cast("Config | None", self.hass.data.get(DOMAIN))
            if username is None:
                _LOGGER.warning("Username not found for id: %s", user.id)

            if username is None or config is None:
                return self.original_connection.send_message(data)

            user_config = config.users.get(username)
            if user_config is None:
                return self.original_connection.send_message(data)


            panels = data["result"]
            default_bounce = user_config.default_bounce

            result = {} if default_bounce == BounceOption.BLOCK else panels.copy()

            for key, value in panels.items():
                if key in user_config.allowed:
                    result[key] = value
                elif key in user_config.blocked:
                    result.pop(key, None)

            for panel_key in PERMANENT_PANELS:
                if panel_key in panels:
                    result[panel_key] = panels[panel_key]

            if user.is_owner:
                result["dash_bouncer"] = panels["dash_bouncer"]

            data["result"] = result
            return self.original_connection.send_message(data)


    @callback
    def rbac_websocket_get_panels(
        get_panel_func: SendMessageFunc
    ) -> Callable[[HomeAssistant, ActiveConnection, dict[str, Any]], None]:
        def wrapper(
            hass: HomeAssistant, connection: ActiveConnection, msg: dict[str, Any]
        ) -> None:
            new_connection = DashBouncerFilterPanelActiveConnection(hass, connection)
            get_panel_func(hass, new_connection,  msg)

        return wrapper

    _LOGGER.info("Attached middleware to panel list WS")
    original_panel_handler, schema = hass.data[WS_DOMAIN]["get_panels"]
    new_panel = rbac_websocket_get_panels(original_panel_handler), schema
    hass.data[WS_DOMAIN]["get_panels"] = new_panel


