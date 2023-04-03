const { app, BrowserWindow, ipcMain } = require("electron"),
    Project = require("./Project"),
    choose = require("./PathChooser"),
    fs = require("fs");

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
}
app.whenReady().then(() => {
    createWindow();
    app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });

let currentProject;

ipcMain.on("openProject", (e, id) => {
    currentProject = new Project(id);
});

ipcMain.on("getFinishedIcons", e => {
    e.reply("Icons", currentProject.getFinishedIcons());
});

ipcMain.on("getRequestedIcons", e => {
    e.reply("Icons", currentProject.getRequestedIcons());
});

ipcMain.on("getIcon", (e, id) => {
    e.reply("Icon", currentProject.fs.loadIconProperties(id));
});

ipcMain.on("setIcon", (e, id, imagechanged, icon, type) => {
    if (imagechanged) {
        console.log("Copying new file...");
        fs.copyFileSync(`pages/icon/cache/${id}.png`, `projects/${currentProject.id}/${type}/${id}.png`);
        console.log("Copied new file.\nClearing cache...");
        fs.rmSync("pages/icon/cache/", { recursive: true, force: true });
        console.log("Cleared cache.");
    }
    currentProject.fs.saveIconProperties(id, icon);
    e.reply("savedIcon");
});

ipcMain.on("getConfig", e => {

});

ipcMain.on("setConfig", (e, data) => {

});

ipcMain.on("getChangelog", e => {

});

ipcMain.on("setChangelog", (e, data) => {

});

ipcMain.on("chooseImagePath", (e, id) => {
    choose.image().then(path => {
        if (!fs.existsSync("pages/icon/cache/")){ fs.mkdirSync("pages/icon/cache/")}
        fs.copyFileSync(path, `pages/icon/cache/${id}.png`);
        e.reply("savedImage");
    })
});

function ensureProject(callback) {
    if (!(currentProject)) {
        choose.dir().then(path => {
            folders = path.split("\\");
            id = folders[folders.length - 1];
            if (!(fs.existsSync(`${path}/project.json`))) { require("./ProjectConverter")(path); }
            currentProject = new Project(id);
            callback();
        });
    } else { callback(); }
}

ipcMain.on("getProjectInfo", e => {
    ensureProject(() => {
        e.reply("ProjectInfo", {
            "id": currentProject.id,
            "title": currentProject.title
        })
    })
});