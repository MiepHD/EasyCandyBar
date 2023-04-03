const { ipcRenderer } = require("electron"),
    params: any = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop)});
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
    let type: string = "finished";
    if (params.type) type = params.type;
    $$("a").href = `../icon/icon.html?type=${type}`;
    for (const drawable of data) {
        $("ul").append($(`<a href="../icon/icon.html?icon=${drawable}&type=${type}"><img src="../../projects/${id}/${type}/${drawable}.png"></a>`));
    }
    if (data["missingimages"]) console.error(data["missingimages"]);
});