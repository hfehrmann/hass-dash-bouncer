"""Initial flow for DashBouncer."""
import logging

from homeassistant.components.frontend import (
    async_register_built_in_panel,
    async_remove_panel,
)
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import SERVICE_RELOAD
from homeassistant.core import HomeAssistant, ServiceCall

from .const import DOMAIN as DOMAIN
from .views import DashBouncerPanelsView

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
        hass: HomeAssistant,
        config: ConfigEntry,# noqa: ARG001
) -> bool:
    """Entry configuration for HASS."""
    _register_side_panel(hass)
    await _async_register_api_call(hass)

    def relaod_dash_bouncer(call: ServiceCall) -> None:
        """Handle reload of the integration."""
    hass.services.async_register(DOMAIN, SERVICE_RELOAD, relaod_dash_bouncer)

    return True

async def async_unload_entry(
        hass: HomeAssistant,
        entry: ConfigEntry, # noqa: ARG001
) -> bool:
    """Unload a config entry."""
    async_remove_panel(hass, frontend_url_path=DOMAIN)
    return True

def _register_side_panel(hass: HomeAssistant) -> None:
    custom_panel_config = {
        "name": "dash-bouncer-frontend",
        "embed_iframe": False,
        "trust_external": False,
        "js_url": "/api/dash_bouncer/static/bundle.js",
    }

    config = {}
    config["_panel_custom"] = custom_panel_config

    async_register_built_in_panel(
        hass,
        component_name="custom",
        sidebar_title="DashBouncer",
        sidebar_icon="mdi:eye-lock",
        frontend_url_path=DOMAIN,
        config=config,
        require_admin=True
    )

async def _async_register_api_call(hass: HomeAssistant) -> None:
    await hass.http.async_register_static_paths([
        StaticPathConfig(
            "/api/dash_bouncer/static",
            hass.config.path("custom_components/" + DOMAIN + "/www"),
            cache_headers=False,
        )
    ])

    hass.http.register_view(DashBouncerPanelsView())



