const { ipcRenderer } = require("electron");
window.$ = window.jQuery = require('jquery');

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("button").addEventListener("click", () => {
        ipcRenderer.send('getIcons', $("input").value);
    });
});

ipcRenderer.on('allIcons', (event, message) => {
    const icons = message;
    console.log(message);
    for (drawable of Object.keys(icons)) {
        $("ul").append($(`<a href=""><img src="project/icons/${drawable}.png"></a>`));
    }
});