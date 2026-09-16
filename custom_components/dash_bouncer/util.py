"""Util module."""
import asyncio
import logging
from pathlib import Path

import yaml
from homeassistant.components.frontend.storage import SystemStore
from homeassistant.core import HomeAssistant

from .config import Config, integration_config_path

_LOGGER = logging.getLogger(__name__)


def get_system_default_panel(store: SystemStore) -> str:
    """Get the default panel of the system."""
    return store.data.get("core", {}).get("default_panel")

async def load_config_from_file(hass: HomeAssistant) -> Config | None:
    """Load config from file."""
    loop = asyncio.get_running_loop()
    def load() -> Config | None:
        config_path = integration_config_path(hass)

        config_data = None
        try:
            with Path(config_path).open() as config:
                config_data = yaml.safe_load(config)
        except FileNotFoundError:
            _LOGGER.warning("No config found.")
            return None
        except Exception:
            _LOGGER.exception("Found problem while opening the access config.")
            return None

        if config_data is None:
            return None

        return Config.loads(config_data)

    return await loop.run_in_executor(None, load)

