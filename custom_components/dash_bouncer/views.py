"""REST endpoints for DashBouncer."""
import logging

from aiohttp import web
from homeassistant.components.frontend import DATA_PANELS
from homeassistant.components.http import HomeAssistantView
from homeassistant.components.person.const import DOMAIN as PERSON_DOMAIN

from .const import PERMANENT_PANELS

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


