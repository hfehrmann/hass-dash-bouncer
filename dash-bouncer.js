Promise.resolve(customElements.whenDefined("hui-view")).then(() => {
  const hassElement = document.querySelector("home-assistant");
  const hassMain = hassElement.shadowRoot.querySelector("home-assistant-main");
  const sidebar = shadowRoot.querySelector("ha-sidebar");

  const hass = hassElement.hass;
  const defaultHassPanelConfig = "lovelace";
  const defaultHassPanelTitle = "overview";

  const currentHassDefaultTitle = hass.panels[defaultHassPanelConfig].title;
  if (defaultHassPanelTitle != currentHassPanelTitle) {


  }

  shadowRoot.children[1].children[2].remove()
});
