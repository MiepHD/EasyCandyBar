const { ipcRenderer } = require("electron"),
    params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop)});
window.$ = window.jQuery = require('jquery');

if (params.pname) { ipcRenderer.send('loadProjectByName', params.pname); }
else { ipcRenderer.send('loadProject'); }
ipcRenderer.on('allIcons', (event, data) => {
    console.log("Received");
    console.log(data);
    const pname = data.projectinfo.package;
    document.title = pname;
    for (drawable of Object.keys(data.iconsdata)) {
        $("ul").append($(`<a href="../icon/icon.html?icon=${drawable}&pname=${pname}"><img src="../../projects/${pname}/icons/${drawable}.png"></a>`));
    }
    if (data[missingimages]) console.error(data[missingimages]);
});