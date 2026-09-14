"""Initial flow for DashBouncer."""
import asyncio
import logging
from pathlib import Path

import yaml
from homeassistant.components.frontend import (
    async_register_built_in_panel,
)
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .config import Config, integration_config_path
from .const import DOMAIN as DOMAIN
from .middleware import patch_panel_list_ws
from .views import (
    DashBouncerConfigView,
    DashBouncerPanelsView,
    DashBouncerRoleConfigView,
    DashBouncerUserConfigView,
    DashBouncerUsersView,
)

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
        hass: HomeAssistant,
        config: ConfigEntry,# noqa: ARG001
) -> bool:
    """Entry configuration for HASS."""
    loop = asyncio.get_running_loop()
    await loop.run_in_executor(None, _load_config, hass)
    _register_side_panel(hass)
    await _async_register_api_call(hass)
    patch_panel_list_ws(hass)

    return True

def _load_config(hass: HomeAssistant) -> None:
    config_path = integration_config_path(hass)

    config_data = None
    try:
        with Path(config_path).open() as config:
            config_data = yaml.safe_load(config)
    except FileNotFoundError:
        _LOGGER.warning("No config found.")
        return
    except Exception:
        _LOGGER.exception("Found problem while opening the access config.")
        return

    if config_data is None:
        return

    config = Config.loads(config_data)

    hass.data[DOMAIN] = config

def _register_side_panel(hass: HomeAssistant) -> None:
    custom_panel_config = {
        "name": "dash-bouncer-dashboard",
        "embed_iframe": False,
        "trust_external": False,
        "js_url": "/api/dash_bouncer/static/bundle.js",
    }

    config = {
        "_panel_custom": custom_panel_config,
    }

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
    hass.http.register_view(DashBouncerUsersView())
    hass.http.register_view(DashBouncerConfigView())
    hass.http.register_view(DashBouncerRoleConfigView())
    hass.http.register_view(DashBouncerUserConfigView())

