
let logger = (a) => console.log("DashBouncer: ", a);

document.addEventListener('DOMContentLoaded', async () => {
    let hass = window.parent.document.querySelector("home-assistant").hass;
    logger(hass);
    let data = await hass.callApi("get", "dash_bouncer/panels");
    logger(data);
})
