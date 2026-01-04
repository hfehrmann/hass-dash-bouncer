"""DashBouncer for Home Assistant."""
from homeassistant import config_entries

from .const import DOMAIN


class DashBouncerConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Config flow for DashBouncer."""

    VERSION = 1

    async def async_step_user(
        self,
        user_input: dict[str, any] | None = None # noqa: ARG002
    ) -> config_entries.FlowResult:
        """Handle user initiated config."""
        return self.async_create_entry(
            title="DashBouncer",
            data={},
        )

