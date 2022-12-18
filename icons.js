const { ipcRenderer } = require("electron");

ipcRenderer.send('getIcons', '');
ipcRenderer.on('allIcons', (event, message) => {
    const icons = message;
    console.log(icons);
}); 