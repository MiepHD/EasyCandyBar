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
        fs.copyFileSync(path, `pages/icon/cache/${id}.png`);
        e.reply("savedImage");
    })
});

function ensureProject(callback: Function) {
    if (!(currentProject)) {
        choose.dir().then((path: string) => {
            const folders: Array<string> = path.split("\\");
            const id: string = folders[folders.length - 1];
            if (!(fs.existsSync(`${path}/project.json`))) { require("./ProjectConverter")(path); }
            currentProject = new Project(id);
            callback();
        });
    } else { callback(); }
}

ipcMain.on("getProjectInfo", (e: any) => {
    ensureProject(() => {
        e.reply("ProjectInfo", {
            "id": currentProject.id,
            "title": currentProject.title
        })
    })
});