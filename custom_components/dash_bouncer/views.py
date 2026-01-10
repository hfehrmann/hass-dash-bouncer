"""REST endpoints for DashBouncer."""
import asyncio
import logging
from pathlib import Path
from typing import Any, cast

import yaml
from aiohttp import web
from homeassistant.components.frontend import DATA_PANELS
from homeassistant.components.http import HomeAssistantView
from homeassistant.components.person.const import DOMAIN as PERSON_DOMAIN

from .config import Config, UserConfig, integration_config_path
from .const import DOMAIN, PERMANENT_PANELS

_LOGGER = logging.getLogger(__name__)

class DashBouncerPanelsView(HomeAssistantView):
    """Endpoint for getting all the panels availables from HASS."""

    url = "/api/dash_bouncer/panels"
    name = "api:dash_bouncer:panels"
    requires_auth = True

    async def get(self, request: web.Request) -> web.Response:
        """Get the panels."""
        hass = request.app["hass"]
        user = request["hass_user"]

        if not user.is_admin:
            return self.json({
                "error": "Admin access required",
                "message": "Only administrators can access panels information",
                "redirect_url": "/"
            }, status_code=403)

        try:
            all_panels = hass.data[DATA_PANELS]
            panels = [
                all_panels[key].to_response()
                for key in all_panels if key not in PERMANENT_PANELS
            ]

            return self.json(panels)
        except Exception as e:
            _LOGGER.exception("Error getting panels")
            return self.json({"error": str(e)}, status_code=500)

        return None

class DashBouncerUsersView(HomeAssistantView):
    """Endpoint for getting all the registered users from HASS."""

    url = "/api/dash_bouncer/users"
    name = "api:dash_bouncer:users"
    requires_auth = True

    async def get(self, request: web.Request) -> web.Response:
        """Get the panels."""
        hass = request.app["hass"]
        user = request["hass_user"]

        if not user.is_admin:
            return self.json({
                "error": "Admin access required",
                "message": "Only administrators can access users information",
                "redirect_url": "/"
            }, status_code=403)

        try:
            _, storage, _ = hass.data[PERSON_DOMAIN]

            return self.json(storage.async_items())
        except Exception as e:
            _LOGGER.exception("Error getting users")
            return self.json({"error": str(e)}, status_code=500)

        return None

class DashBouncerConfigView(HomeAssistantView):
    """Endpoint for getting the bouncer config."""

    url = "/api/dash_bouncer/config"
    name = "api:dash_bouncer:config"
    requires_auth = True

    async def get(self, request: web.Request, user: Any = None) -> web.Response:
        """Get the config for the system."""
        hass = request.app["hass"]
        user = request["hass_user"]

        if not user.is_admin:
            return self.json({
                "error": "Admin access required",
                "message": "Only administrators can access config information",
                "redirect_url": "/"
            }, status_code=403)

        try:
            config = cast("Config | None", hass.data.get(DOMAIN))
            return self.json(None if config is None else config.dump())
        except Exception as e:
            _LOGGER.exception("Error getting config")
            return self.json({"error": str(e)}, status_code=500)

        return None


class DashBouncerUserConfigView(HomeAssistantView):
    """Endpoint for getting the bouncer config."""

    url = "/api/dash_bouncer/config/{user_name}"
    name = "api:dash_bouncer:config:user"
    requires_auth = True

    async def post(self, request: web.Request, user_name: str) -> web.Response:
        """Set config for user."""
        hass = request.app["hass"]
        user = request["hass_user"]

        if not user.is_admin:
            return self.json({
                "error": "Admin access required",
                "message": "Only administrators can access config information",
                "redirect_url": "/"
            }, status_code=403)

        try:
            config = cast("Config | None", hass.data.get(DOMAIN))

            if config is None:
                config = Config({})

            new_config = Config(users=config.users.copy())
            data = await request.json()
            new_config.users[user_name] = UserConfig.loads(data)

            config_path = integration_config_path(hass)

            def save_config() -> None:
                with Path(config_path).open("w") as config_file:
                    yaml.dump(new_config.dump(), config_file, sort_keys=False)

            loop = asyncio.get_running_loop()
            await loop.run_in_executor(None, save_config)

            hass.data[DOMAIN] = new_config
            return self.json(new_config)
        except Exception as e:
            _LOGGER.exception("Error writting the new config")
            return self.json({"error": str(e)}, status_code=500)

        return None


