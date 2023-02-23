const { app, BrowserWindow, ipcMain, dialog } = require("electron"),
    loadproject = require("./loadProject"),
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

ipcMain.on("getIcons", (event) => {
    console.log("requested");
    dialog.showOpenDialog(
        BrowserWindow.getFocusedWindow(), {
        properties: ["openDirectory"],
        filters: [{
            name: "All Files",
            extensions: ["*"]
        }]
    }).then ( result => {
        const path = result.filePaths[0].replace("\\\\", "/");
        if (fs.existsSync(`${path}/project.json`)) {
            event.reply("allIcons", loadproject.existing(path));
        } else {
            event.reply("allIcons", loadproject.new(path));
        }
        console.log("sent iconsdata");
    });
});