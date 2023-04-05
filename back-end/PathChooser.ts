const dialog = require("electron").dialog,
    BrowserWindow = require("electron").BrowserWindow;

function template(type: string, title: string, ext: string): string {
    return dialog.showOpenDialog( BrowserWindow.getFocusedWindow(), {
        properties: [type],
        filters: [{
            name: title,
            extensions: [ext]
        }]
    }).then((r: any) => { return r.filePaths[0]});
}

function dir(): string { return template("openDirectory", "Project or other icon pack folder", "*")}

function image(): string { return template("openFile", "Images", "png")}

module.exports = {
    dir,
    image
}