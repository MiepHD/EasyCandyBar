const dialog = require("electron").dialog,
    BrowserWindow = require("electron").BrowserWindow;

function dir() {
    return dialog.showOpenDialog(
        BrowserWindow.getFocusedWindow(), {
        properties: ["openDirectory"],
        filters: [{
            name: "Project or other icon pack folder",
            extensions: ["*"]
        }]
    }).then(r => { return r.filePaths[0].replace("\\\\", "/")});
}

function image() {
    return dialog.showOpenDialog( BrowserWindow.getFocusedWindow(), {
        properties: ["openFile"],
        filters: [{
            name: "Images",
            extensions: ["png"]
        }]
    });
}

module.exports = {
    dir,
    image
}