"""Class that represents current integation config."""
import logging
from collections.abc import Sequence
from dataclasses import dataclass
from enum import StrEnum
from pathlib import Path
from typing import Any, Optional

from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

def integration_config_path(hass: HomeAssistant) -> str:
    """Integration config file path."""
    integration_path = Path("custom_components") / "dash_bouncer" / "access.yaml"
    return Path(hass.config.config_dir) / integration_path

class BounceOption(StrEnum):
    """Allowed values for bounce actions."""

    ALLOW = "allow"
    BLOCK = "block"
    NONE = "none"

    @classmethod
    def _missing_(cls, _value: object) -> "BounceOption":
        return BounceOption.NONE

@dataclass
class UserConfig:
    """Class to hold user config."""

    default_bounce: BounceOption
    roles: Sequence[str]
    allowed: set[str]
    blocked: set[str]

    @classmethod
    def loads(cls, data: dict[str, Any]) -> Optional["UserConfig"]:
        """Load data from dict."""
        default_data = data.get("default_bounce")
        roles = data.get("roles", [])
        allowed = data.get("allowed", [])
        blocked = data.get("blocked", [])

        if (default_data is None or
                (default := BounceOption(default_data)) == BounceOption.NONE):
            msg = "Missing default action"
            raise ValueError(msg)

        if (not isinstance(roles, list) or
                not all(isinstance(v, str) for v in roles)):
            msg = "Invalid data for roles"
            raise ValueError(msg)

        if (not isinstance(allowed, list) or
                not all(isinstance(v, str) for v in allowed)):
            msg = "Invalid data for allowed"
            raise ValueError(msg)

        if (not isinstance(blocked, list) or
                not all(isinstance(v, str) for v in blocked)):
            msg = "Invalid data for blocked"
            raise ValueError(msg)

        return cls(default, list(roles), set(allowed), set(blocked))

    def dump(self) -> dict[str, Any]:
        """Dump object into dict. Ready for serialization."""
        data = {
            "default_bounce": f"{self.default_bounce}"
        }

        if self.roles:
            data["roles"] = list(self.roles)
        if self.allowed:
            data["allowed"] = list(self.allowed)
        if self.blocked:
            data["blocked"] =  list(self.blocked)

        return data

@dataclass
class RoleConfig:
    """Class to hold user config."""

    allowed: set[str]
    blocked: set[str]

    @classmethod
    def loads(cls, data: dict[str, Any]) -> Optional["RoleConfig"]:
        """Load data from dict."""
        allowed = data.get("allowed", [])
        blocked = data.get("blocked", [])

        if (not isinstance(allowed, list) or
                not all(isinstance(v, str) for v in allowed)):
            msg = "Invalid data for allowed"
            raise ValueError(msg)

        if (not isinstance(blocked, list) or
                not all(isinstance(v, str) for v in blocked)):
            msg = "Invalid data for blocked"
            raise ValueError(msg)

        return cls(set(allowed), set(blocked))

    def dump(self) -> dict[str, Any]:
        """Dump object into dict. Ready for serialization."""
        data = {}

        if self.allowed:
            data["allowed"] = list(self.allowed)
        if self.blocked:
            data["blocked"] =  list(self.blocked)

        return data

@dataclass
class Config:
    """Class to hold all user configs."""

    users: dict[str, UserConfig]
    roles: dict[str, RoleConfig]

    @classmethod
    def loads(cls, data: dict[str, Any]) -> Optional["Config"]:
        """Load data from dict."""
        users = data.get("users")
        if users is None and not isinstance(users, dict):
            _LOGGER.warning("No users in config data. Allowing everyone.")
            return None

        users_data = {}
        user_errors = set()
        for key, user_data in users.items():
            try:
                users_data[key] = UserConfig.loads(user_data)
            except ValueError:
                user_errors.add(key)

        if user_errors:
            _LOGGER.warning(
                "Invalid user configs for: %s. No restrictions applied to them.",
                ", ".join([f"'{u}'" for u in user_errors])
            )

        roles = data.get("roles", {})
        roles_data = {}
        role_errors = set()
        if isinstance(roles, dict):
            for key, role_data in roles.items():
                try:
                    roles_data[key] = RoleConfig.loads(role_data)
                except ValueError:
                    role_errors.add(key)

        else:
            _LOGGER.warning("Bad roles data. No role configured")

        if role_errors:
            _LOGGER.warning(
                "Invalid role configs for: %s. Skippig them from the policies.",
                ", ".join([f"'{u}'" for u in role_errors])
            )

        return cls(users_data, roles_data)

    def dump(self) -> dict[str, Any]:
        """Dump object into dict. Ready for serialization."""
        return {
            "users": {
                key: config.dump()
                for key, config in self.users.items()
            },
            "roles": {
                key: config.dump()
                for key, config in self.roles.items()
            },
        }


