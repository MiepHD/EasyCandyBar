const dialog = require("electron").dialog,
    BrowserWindow = require("electron").BrowserWindow;

function template(type, title, ext) {
    return dialog.showOpenDialog( BrowserWindow.getFocusedWindow(), {
        properties: [type],
        filters: [{
            name: title,
            extensions: [ext]
        }]
    }).then(r => { return r.filePaths[0]});
}

function dir() { return template("openDirectory", "Project or other icon pack folder", "*")}

function image() { return template("openFile", "Images", "png")}

module.exports = {
    dir,
    image
}