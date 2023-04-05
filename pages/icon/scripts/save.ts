/**
 * Constant variables for this file
 * It is marked as duplicated declaration 'cause Typescript doesn't understand that these are different files and it has to be declared again
 * Maybe there's a fix for that
**/
const { ipcRenderer } = require("electron"),
    params: URLSearchParams = new URLSearchParams(window.location.search);

let data: any = {};
for (const att of ["title", "description", "category", "package", "activity"]) { data[att] = params.get(att)}
ipcRenderer.send("setIcon", params.get("id"), params.get("imagechanged"), data, params.get("type"));
ipcRenderer.on("savedIcon", () => { window.location.href = "../list/list.html"});