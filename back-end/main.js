const { app, BrowserWindow, ipcMain } = require("electron"),
    loadproject = require("./loadProject"),
    choose = require("./pathChooser"),
    fs = require("fs");

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

ipcMain.on("loadProject", e => {
    console.log("requested");
    choose.dir().then(path => {
        const data = fs.existsSync(`${path}/project.json`) ? loadproject.existing(path) : loadproject.new(path);
        const returndata = JSON.parse(`${JSON.stringify(data)}`);
        console.log("Filtering iconsdata...");
        for (key of Object.keys(data["iconsdata"])) {
            delete returndata["iconsdata"][key]["package"];
            delete returndata["iconsdata"][key]["activity"];
        }
        console.log("Filtered iconsdata.");
        e.reply("allIcons", returndata);
        console.log("Sent data.");
    });
});

ipcMain.on("loadProjectByName", (e, pname) => {
    e.reply("allIcons", loadproject.existing(`projects/${pname}`));
    console.log("Sent iconsdata");
});

ipcMain.on("getIcon", (e, icon) => {
    e.reply("Icon", loadproject.getCurrentData()["iconsdata"][icon]);
    console.log("Sent icon");
});

ipcMain.on("chooseImagePath", e => {choose.image().then(path => { e.reply("imagePath", path)})});