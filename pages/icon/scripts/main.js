const { ipcRenderer } = require("electron"),
    params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop)});

document.addEventListener("DOMContentLoaded", () => {
    $$("input[name=pname]").value = params.pname;
    $$("input[name=id]").value = params.icon;
    $$("img").src = `../../projects/${params.pname}/icons/${params.icon}.png`;
    $$("a").href = `../list/list.html?pname=${params.pname}`;
    $$("button").addEventListener("click", () => { ipcRenderer.send("chooseImagePath", params.icon)});
});

ipcRenderer.send('getIcon', params.icon);
ipcRenderer.on("Icon", (e, data) => {
    $$("input[name=title]").value = data.title;
    document.title = data.title;
    $$("input[name=description]").value = data.description;
    $$("input[name=category]").value = data.category;
    $$("input[name=package]").value = data.package;
    $$("input[name=activity]").value = data.activity;
});

ipcRenderer.on("savedImage", () => {
    $$("img").src = `cache/${params.icon}.png`;
    $$("input[name=imagechanged]").checked = true;
});