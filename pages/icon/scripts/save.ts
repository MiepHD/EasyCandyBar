const { ipcRenderer } = require("electron"),
    params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop)});

let data: any = {};
for (const att of ["title", "description", "category", "package", "activity"]) { data[att] = params[att]}
ipcRenderer.send("setIcon", params.id, params.imagechanged, data, params.type);
ipcRenderer.on("savedIcon", () => { window.location.href = "../list/list.html"});