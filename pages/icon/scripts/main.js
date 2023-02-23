const { ipcRenderer } = require("electron"),
    params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop)});

document.addEventListener("DOMContentLoaded", () => { $$("input[name=pname]").value = params.pname; });

ipcRenderer.send('getIcon', params.icon);
ipcRenderer.on("Icon", (event, data) => {
    $$("img").src = `../../projects/${params.pname}/icons/${params.icon}.png`;
    $$("input[name=name]").value = data.title;
    document.title = data.title;
    $$("input[name=description]").value = data.description;
    $$("input[name=category]").value = data.category;
    $$("input[name=package]").value = data.package;
    $$("input[name=activity]").value = data.activity;
});