const { ipcRenderer } = require("electron"),
    params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop)});

ipcRenderer.send('getIcon', { 
    "icon": params.icon,
    "pname": params.pname
});
document.addEventListener("DOMContentLoaded", () => {
    $$("form").action = `../list/list.html?pname=${params.pname}`
})