Want to support?

You'll need a develop instance of `homeassistant-core` project to work on this.

## Backend
For every backend modification, you will need to reload HASS in order to reload the integration code.

If you install [entr](https://github.com/eradman/entr), you can use the following command
```bash
find <project_root>/custom_components/dash_bouncer/ -name "*.py" -type f | entr -cr hass -c config
```
when initializing the HASS backend and this will restart the HASS process when it detects changes on
the integration code.

## Frontend

```
cd <project_root>/custom_components/dash_bouncer/frontend
npm run dev
```

This will attach a live reload server that will update the web app on every js file modification under `frontend`.

## Publishing

Run the following checks:
```bash
ruff check --fix
(cd custom_components/dash_bouncer/frontend && \
  npm run lint && \
  npm run format_check)
```

## TODO

- Modify default dashboard selection in the user profile.
- Improve the AI generated logo.
