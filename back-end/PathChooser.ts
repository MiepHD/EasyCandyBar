<<<<<<<< HEAD:back-end/PathChooser.ts
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

========
"use strict";
const dialog = require("electron").dialog, BrowserWindow = require("electron").BrowserWindow;
function template(type, title, ext) {
    return dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
        properties: [type],
        filters: [{
                name: title,
                extensions: [ext]
            }]
    }).then((r) => { return r.filePaths[0]; });
}
function dir() { return template("openDirectory", "Project or other icon pack folder", "*"); }
function image() { return template("openFile", "Images", "png"); }
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:back-end/pathChooser.js
module.exports = {
    dir,
    image
};
