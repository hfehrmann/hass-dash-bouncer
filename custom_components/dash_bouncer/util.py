"""Util module."""
from homeassistant.components.frontend.storage import SystemStore


def get_system_default_panel(store: SystemStore) -> str:
    """Get the default panel of the system."""
    return store.data.get("core", {}).get("default_panel")
