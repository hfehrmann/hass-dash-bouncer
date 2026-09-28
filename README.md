![dash bouncer logo.](/docs/media/logo.png)

Custom integration for managing dashboard access for users.

**Allow'em or block'em. Up to you now!**

## Screenshots

![dash bouncer demo usage](/docs/media/dash_bouncer_demo.gif)
> [!Note]
> You need to refresh the web app, so the config takes place.

## Features

This integration is a middleware for the list panel endpoint for users, and the
frontend uses the result of that endpoint to generate all the valid URLs
a user can use to navigate inside the app. This means, the integration
blocks the navigation possibilities of a user, even if they enter the exact
URL they want to navigate to.

You can:
- Define roles and their dashboard configuration.
- Configure what dashbaords a user has access to.
- Configure the default action for a user.
- Configure the roles for a user.

It allows everything by default if there is no config for a user.

You can edit the integration `access.yaml` at the intgration root level
for manual edits, but you'll need to reload the config from the
Dashbouncer panel or restart Home Assistant.

### Caveats
> [!NOTE]
> If you don't have a default dashboard, the default is going to be the Overview (`/home`)

- The integration always send the default dashboard configured in the system,
  since HA relies on it for fallback navigation. Select a new dashboard in
  **Settings > Dashboards**
- You can block a user `/profile` URL, and that user looses access to its
  profile.
- The default dashboard selection in the user profile uses another endpoint to
  show the options to select. This integration is not handling that option yet.
  The user will be redirected to the default system dashboard if they select a
  blocked dashboard for them.

## Installation

### HACS

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=hfehrmann&repository=hass-dash-bouncer)

### Manual

1. Put the `custom_components/dash_bouncer` folder inside your home assistant `custom_components` folder. The end result should looke like
`<root_home_assistant>/config/custom_components/dasb_bouncer/`

## Known Problems

1. The owner might have two default panel in the sidebar if the overview/home panel is blocked to them
![known problem showing double panel](/docs/media/kp_double_panel.png)
2. Only the owner is able to access `Settings > Dashboards` due to the same limitation as above.
    1. Instead of targeting the owner, we could target admins, but they will present problem 1.
