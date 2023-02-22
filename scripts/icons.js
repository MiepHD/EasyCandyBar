const { ipcRenderer } = require("electron");
window.$ = window.jQuery = require('jquery');

ipcRenderer.send('getIcons');
ipcRenderer.on('allIcons', (event, data) => {
    const pname = data.projectinfo.package;
    document.title = pname;
    for (drawable of Object.keys(data.iconsdata)) {
        $("ul").append($(`<a href="icon.html?icon=${drawable}&pname=${pname}"><img src="projects/${pname}/icons/${drawable}.png"></a>`));
    }
    console.error(data.missingimages);
});