const { param } = require("jquery");

const { ipcRenderer } = require("electron"),
    params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop)}),
    data = {};

for (att of ["id", "pname", "imagechanged"]) { data[att] = params[att]}
data["iconsdata"] = {};
for (att of ["title", "description", "category", "package", "activity"]) { data["iconsdata"][att] = params[att]}
ipcRenderer.send("saveIcon", data);
ipcRenderer.on("savedIcon", () => { window.location = `../list/list.html?pname=${params.pname}`});