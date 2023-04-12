const { ipcRenderer } = require("electron"),
    params: URLSearchParams = new URLSearchParams(window.location.search);

let data: any = {};
for (const att of ["title", "description", "category", "package", "activity"]) { data[att] = params.get(att)}
ipcRenderer.send("setIcon", params.get("id"), params.get("imagechanged"), data, params.get("type"));
ipcRenderer.on("savedIcon", () => { window.location.href = `../list/list.html?type=${params.get("type")}`});