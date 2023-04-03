<<<<<<<< HEAD:pages/icon/scripts/main.ts
const { ipcRenderer } = require("electron"),
    params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop)});

let project: string;
ipcRenderer.send("getProjectInfo");
ipcRenderer.on("ProjectInfo", (data: any) => {
========
"use strict";
const { ipcRenderer } = require("electron"), params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop) });
let project;
ipcRenderer.send("getProjectInfo");
ipcRenderer.on("ProjectInfo", (data) => {
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:pages/icon/scripts/main.js
    project = data.id;
});
document.addEventListener("DOMContentLoaded", () => {
    if (params.icon) {
        ipcRenderer.send('getIcon', params.icon);
        $$("input[name=id]").value = params.icon;
<<<<<<<< HEAD:pages/icon/scripts/main.ts
    } else {
        $$("input[name=title]").onchange = (e: any) => {
========
    }
    else {
        $$("input[name=title]").onchange = (e) => {
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:pages/icon/scripts/main.js
            $$("input[name=id]").value = e.target.value.toLowerCase().replace(" ", "_");
        };
    }
    $$("input[name=type]").value = params.type;
    $$("img").src = `../../projects/${project}/${params.type}/${$$("input[name=id]").value}.png`;
    $$("a").href = `../list/list.html`;
    $$("button").addEventListener("click", () => {
        const id = $$("input[name=id]").value;
        if (id && id != "") {
            ipcRenderer.send("chooseImagePath", id);
        }
        else {
            console.log("Name required");
        }
    });
});
<<<<<<<< HEAD:pages/icon/scripts/main.ts

ipcRenderer.on("Icon", (e: any, data: any) => {
========
ipcRenderer.on("Icon", (e, data) => {
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:pages/icon/scripts/main.js
    $$("input[name=title]").value = data.title;
    document.title = data.title;
    $$("input[name=description]").value = data.description;
    $$("input[name=category]").value = data.category;
    $$("input[name=package]").value = data.package;
    $$("input[name=activity]").value = data.activity;
});
ipcRenderer.on("savedImage", () => {
    $$("img").src = `cache/${$$("input[name=id]").value}.png`;
    $$("input[name=imagechanged]").checked = true;
});
