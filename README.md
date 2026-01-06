> [!Warning]
> First iteration. This is mostly a proof of concept.

## Development

You'll need the `homeassistant-core` projects to develop this project.
You'll also need the HACS integration to handle the import of the `custom_components` folder into HASS

### Backend
On every backend modification, you will need to reload HASS in order to reload the integration code.

If you install [entr](https://github.com/eradman/entr), you can use the following command
```bash
find <project_root>/custom_components/dash_bouncer/ -name "*.py" -type f | entr -cr hass -c config
```
when initializing the HASS backend and this will restart the HASS process.

### Frontend

```
cd <project_root>/custom_components/dash_bouncer/frontend
npm run dev
```

This will attach a live reload server that will update the web app on every js file modification under `frontend`.
