"""Define backend middlewares."""
import logging
from collections.abc import Callable, Coroutine
from functools import wraps
from typing import Any, cast

from homeassistant.components import websocket_api
from homeassistant.components.frontend.storage import SystemStore, with_system_store
from homeassistant.components.websocket_api.connection import ActiveConnection
from homeassistant.components.websocket_api.const import DOMAIN as WS_DOMAIN
from homeassistant.core import HomeAssistant, callback

from .config import BounceOption, Config
from .const import DEFAULT_PANEL, DOMAIN, PERMANENT_PANELS

_LOGGER = logging.getLogger(__name__)


def patch_panel_list_ws(hass: HomeAssistant) -> None:
    """Set middleware for 'get_panels' WS endpoint."""

    class DashBouncerFilterPanelActiveConnection:
        """Wrapper for connection that filer restricted panels."""

        __slots__ = [
            "hass",
            "original_connection",
            "store",
        ]

        def __init__(
            self,
            hass: HomeAssistant,
            connection: ActiveConnection,
            store: SystemStore,
        ) -> None:
            self.hass = hass
            self.original_connection = connection
            self.store = store

        def __getattr__(self, name: str): # noqa: ANN204
            return getattr(self.original_connection, name)

        def send_message(self, data: dict[str, Any]) -> None:
            user = self.original_connection.user
            config = cast("Config | None", self.hass.data.get(DOMAIN))

            if config is None:
                return self.original_connection.send_message(data)

            user_config = config.users.get(user.id)
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

            default_panel = self.store.data.get("core", {}).get("default_panel")

            # If the default panel is blocked, it can cause issues when
            # managing the dashboards from the system setting.
            # Defaulting to send back the 'lovelace' panel if blocked
            # only to the owner of the instance.
            # Depening on the sytem config, this might show the default
            # panel two times in the sidebar
            if DEFAULT_PANEL not in result and user.is_owner:
                fake_default_panel = panels[default_panel].copy()
                fake_default_panel["default_visible"] = False
                result[DEFAULT_PANEL] = fake_default_panel
            if default_panel not in result:
                result[default_panel] = panels[default_panel]

            data["result"] = result
            return self.original_connection.send_message(data)


    @callback
    def rbac_websocket_get_panels(
        get_panel_func: Callable[
            [HomeAssistant, ActiveConnection, dict[str, Any]],
            None
        ],
    ) -> Callable[
        [HomeAssistant, ActiveConnection, dict[str, Any], SystemStore],
        Coroutine[Any, Any, None],
    ]:

        @wraps(get_panel_func)
        @websocket_api.async_response
        @with_system_store
        async def wrapper(
            hass: HomeAssistant,
            connection: ActiveConnection,
            msg: dict[str, Any],
            store: SystemStore,
        ) -> None:
            new_connection = DashBouncerFilterPanelActiveConnection(
                hass,
                connection,
                store
            )
            get_panel_func(hass, new_connection,  msg)

        return wrapper

    _LOGGER.info("Attached middleware to panel list WS")
    original_panel_handler, schema = hass.data[WS_DOMAIN]["get_panels"]
    new_panel = rbac_websocket_get_panels(original_panel_handler), schema
    hass.data[WS_DOMAIN]["get_panels"] = new_panel


