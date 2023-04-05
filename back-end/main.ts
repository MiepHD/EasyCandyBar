"use strict";
const { app, BrowserWindow, ipcMain } = require("electron"), Project = require("./Project"), choose = require("./PathChooser"), fs = require("fs");
//Start app
const createWindow = () => {
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        width: 800,
        height: 600
    });
    win.loadFile("pages/home/home.html");
};
app.whenReady().then(() => {
    createWindow();
    app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0)
        createWindow(); });
});
<<<<<<<< HEAD:back-end/main.ts
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });

let currentProject: Project;

ipcMain.on("openProject", (e: any, id: string) => {
    currentProject = new Project(id);
});

ipcMain.on("getFinishedIcons", (e: any) => {
    e.reply("Icons", currentProject.getFinishedIcons());
});

ipcMain.on("getRequestedIcons", (e: any) => {
    e.reply("Icons", currentProject.getRequestedIcons());
});

ipcMain.on("getIcon", (e: any, id: string) => {
    e.reply("Icon", currentProject.fs.loadIconProperties(id));
});

ipcMain.on("setIcon", (e: any, id: string, imagechanged: boolean, icon: any, type: string) => {
========
app.on("window-all-closed", () => { if (process.platform !== "darwin")
    app.quit(); });
let currentProject;
ipcMain.on("openProject", (e, id) => {
    currentProject = new Project(id);
});
ipcMain.on("getFinishedIcons", (e) => {
    e.reply("Icons", currentProject.getFinishedIcons());
});
ipcMain.on("getRequestedIcons", (e) => {
    e.reply("Icons", currentProject.getRequestedIcons());
});
ipcMain.on("getIcon", (e, id) => {
    e.reply("Icon", currentProject.fs.loadIconProperties(id));
});
ipcMain.on("setIcon", (e, id, imagechanged, icon, type) => {
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:back-end/main.js
    if (imagechanged) {
        console.log("Copying new file...");
        fs.copyFileSync(`pages/icon/cache/${id}.png`, `projects/${currentProject.id}/${type}/${id}.png`);
        console.log("Copied new file.\nClearing cache...");
        fs.rmSync("pages/icon/cache/", { recursive: true, force: true });
        console.log("Cleared cache.");
    }
    currentProject.saveIconProperties(id, icon);
    e.reply("savedIcon");
});
<<<<<<<< HEAD:back-end/main.ts

ipcMain.on("getConfig", (e: any) => {

});

ipcMain.on("setConfig", (e: any, data: any) => {

});

ipcMain.on("getChangelog", (e: any) => {

});

ipcMain.on("setChangelog", (e: any, data: any) => {

});

ipcMain.on("chooseImagePath", (e: any, id: string) => {
    choose.image().then((path: string) => {
        if (!fs.existsSync("pages/icon/cache/")){ fs.mkdirSync("pages/icon/cache/")}
========
ipcMain.on("getConfig", (e) => {
});
ipcMain.on("setConfig", (e, data) => {
});
ipcMain.on("getChangelog", (e) => {
});
ipcMain.on("setChangelog", (e, data) => {
});
ipcMain.on("chooseImagePath", (e, id) => {
    choose.image().then((path) => {
        if (!fs.existsSync("pages/icon/cache/")) {
            fs.mkdirSync("pages/icon/cache/");
        }
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:back-end/main.js
        fs.copyFileSync(path, `pages/icon/cache/${id}.png`);
        e.reply("savedImage");
    });
});
<<<<<<<< HEAD:back-end/main.ts

function ensureProject(callback: Function) {
    if (!(currentProject)) {
        choose.dir().then((path: string) => {
            const folders: Array<string> = path.split("\\");
            const id: string = folders[folders.length - 1];
            if (!(fs.existsSync(`${path}/project.json`))) { require("./ProjectConverter")(path); }
========
function ensureProject(callback) {
    if (!(currentProject)) {
        choose.dir().then((path) => {
            const folders = path.split("\\");
            const id = folders[folders.length - 1];
            if (!(fs.existsSync(`${path}/project.json`))) {
                require("./ProjectConverter")(path);
            }
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:back-end/main.js
            currentProject = new Project(id);
            callback();
        });
    }
    else {
        callback();
    }
}
<<<<<<<< HEAD:back-end/main.ts

ipcMain.on("getProjectInfo", (e: any) => {
========
ipcMain.on("getProjectInfo", (e) => {
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:back-end/main.js
    ensureProject(() => {
        e.reply("ProjectInfo", {
            "id": currentProject.id,
            "title": currentProject.title
        });
    });
});
