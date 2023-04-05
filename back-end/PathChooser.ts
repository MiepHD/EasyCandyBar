/**
 * Constant variables for this file
 * It is marked as duplicated declaration 'cause Typescript doesn't understand that these are different files and it has to be declared again
 * Maybe there's a fix for that
**/
const dialog = require("electron").dialog,
    BrowserWindow = require("electron").BrowserWindow;

//The template for a open-dialog
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