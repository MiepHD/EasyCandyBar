/**
 * Constant variables for this file
 * It is marked as duplicated declaration 'cause Typescript doesn't understand that these are different files and it has to be declared again
 * Maybe there's a fix for that
**/
const { ipcRenderer } = require("electron"),
    params: URLSearchParams = new URLSearchParams(window.location.search);
ipcRenderer.send("getProjectInfo");

let id: string = "";
ipcRenderer.on("ProjectInfo", (event: any, data: any) => {
    document.title = data.title;
    id = data.id;
    ipcRenderer.send('getFinishedIcons');
});
ipcRenderer.on('Icons', (event: any, data: any) => {
    console.log("Received");
    console.log(data);
    //This won't return null but to prevent Typescript error it is part of the declaration
    const type: string | null = params.get("type") ? params.get("type") : "finished";
    $$("a").href = `../icon/icon.html?type=${type}`;
    for (const drawable of data) {
        $("ul").append($(`<a href="../icon/icon.html?icon=${drawable}&type=${type}"><img src="../../projects/${id}/${type}/${drawable}.png"></a>`));
    }
    if (data["missingimages"]) console.error(data["missingimages"]);
});