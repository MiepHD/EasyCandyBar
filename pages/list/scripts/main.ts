<<<<<<<< HEAD:pages/list/scripts/main.ts
const { ipcRenderer } = require("electron"),
    params: any = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop)});
ipcRenderer.send("getProjectInfo");

let id: string = "";
ipcRenderer.on("ProjectInfo", (event: any, data: any) => {
========
"use strict";
const { ipcRenderer } = require("electron"), params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop) });
ipcRenderer.send("getProjectInfo");
let id = "";
ipcRenderer.on("ProjectInfo", (event, data) => {
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:pages/list/scripts/main.js
    document.title = data.title;
    id = data.id;
    ipcRenderer.send('getFinishedIcons');
});
ipcRenderer.on('Icons', (event: any, data: any) => {
    console.log("Received");
    console.log(data);
<<<<<<<< HEAD:pages/list/scripts/main.ts
    let type: string = "finished";
    if (params.type) type = params.type;
========
    let type = "finished";
    if (params.type)
        type = params.type;
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:pages/list/scripts/main.js
    $$("a").href = `../icon/icon.html?type=${type}`;
    for (const drawable of data) {
        $("ul").append($(`<a href="../icon/icon.html?icon=${drawable}&type=${type}"><img src="../../projects/${id}/${type}/${drawable}.png"></a>`));
    }
<<<<<<<< HEAD:pages/list/scripts/main.ts
    if (data["missingimages"]) console.error(data["missingimages"]);
});
========
    if (data["missingimages"])
        console.error(data["missingimages"]);
});
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:pages/list/scripts/main.js
