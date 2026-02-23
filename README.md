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
blocks the navigation possibilities of a user, even if the enter the exact
URL they want to navigate to.

You can:
- Configure per user basis
- Configure default action for a user
- Configure per dashboard access level

It allows everything by default if there is no config for a user.

You can edit the integration `access.yaml` at the intgration root level
for manual edits, but you will need to restart Home Assistant to load
the manual edit.

### Caveats
- You can block a user `/profile` URL, and that user looses access to its
  dashboard
- The default dashboard selection in the user profile uses another endpoint to
  show the options to select. This integration is not handling thet option yet.
  The user will be redirected to the default system dashboard if they select a
  blocked dashboard for them.

## Installation

### HACS

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=hfehrmann&repository=hass-dash-bouncer)

### Manual

1. Put the `custom_components/dash_bouncer` folder inside your home assistant `custom_components` folder. The end result should looke like
`<root_home_assistant>/config/custom_components/dasb_bouncer/`

## Development

Want to support?

You'll need a develop instance of `homeassistant-core` project to work on this.

### Backend
For every backend modification, you will need to reload HASS in order to reload the integration code.

If you install [entr](https://github.com/eradman/entr), you can use the following command
```bash
find <project_root>/custom_components/dash_bouncer/ -name "*.py" -type f | entr -cr hass -c config
```
when initializing the HASS backend and this will restart the HASS process when it detects changes on
the integration code.

### Frontend

```
cd <project_root>/custom_components/dash_bouncer/frontend
npm run dev
```

This will attach a live reload server that will update the web app on every js file modification under `frontend`.

### Publishing

Run the following checks:
```bash
ruff check --fix
(cd custom_components/dash_bouncer/frontend && \
  npm run lint && \
  npm run format_check)
```

### TODO

- Signal in the UI that the system default dashboard is not bounceable, and will always be provided.
- Provide a way to source the `access.yaml` file if there are new manual edits.
- Modify default dashboard selection in the user profile.
- Add github actions to validate new code is up to standard.
- Improve the AI generated logo.

## Known Problems

1. The owner might have two default panel in the sidebar if the overview panel is blocked to them
![known problem showing double panel](/docs/media/kp_double_panel.png)
2. Only the owner is able to access `Settings > Dashboards` due to the same limitation as above.
    1. Instead of targeting the owner, we could target admins, but they will present problem 1.
