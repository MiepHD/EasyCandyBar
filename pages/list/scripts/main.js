const { ipcRenderer } = require("electron"),
    params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop)});
window.$ = window.jQuery = require('jquery');
ipcRenderer.send("getProjectInfo");

id = "";
ipcRenderer.on("ProjectInfo", (event, data) => {
    document.title = data.title;
    id = data.id;
    ipcRenderer.send('getFinishedIcons');
});
ipcRenderer.on('Icons', (event, data) => {
    console.log("Received");
    console.log(data);
    type = "finished";
    if (params.type) type = params.type;
    $$("a").href = `../icon/icon.html?type=${type}`;
    for (drawable of data) {
        $("ul").append($(`<a href="../icon/icon.html?icon=${drawable}&type=${type}"><img src="../../projects/${id}/${type}/${drawable}.png"></a>`));
    }
    if (data[missingimages]) console.error(data[missingimages]);
});