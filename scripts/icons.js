const { ipcRenderer } = require("electron");
window.$ = window.jQuery = require('jquery');

const params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop), });
ipcRenderer.send('getIcons', params.pname);

ipcRenderer.on('allIcons', (event, icons) => {
    for (drawable of Object.keys(icons)) {
        $("ul").append($(`<a href=""><img src="project/icons/${drawable}.png"></a>`));
    }
});