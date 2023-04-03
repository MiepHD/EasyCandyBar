const { ipcRenderer } = require("electron"),
    params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop)});

data = {};
for (att of ["title", "description", "category", "package", "activity"]) { data[att] = params[att]}
ipcRenderer.send("setIcon", params.id, params.imagechanged, data, params.type);
ipcRenderer.on("savedIcon", () => { window.location = "../list/list.html"});