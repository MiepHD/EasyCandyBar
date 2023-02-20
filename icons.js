const { ipcRenderer } = require("electron");
window.$ = window.jQuery = require('jquery');

ipcRenderer.send('getIcons', '');
ipcRenderer.on('allIcons', (event, message) => {
    const icons = message;
    console.log(message);
    for (drawable of Object.keys(icons)) {
        $("ul").append($(`<a href=""><img src="cache/${drawable}.png"></a>`));
    }
}); 