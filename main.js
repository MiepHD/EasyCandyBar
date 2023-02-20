const { app, BrowserWindow, ipcMain, dialog } = require("electron"),
    xmlparse = require("./xmlDataExtractor"),
    fs = require("fs-extra"),
    paths = require("path");

const createWindow = () => {
    const win = new BrowserWindow({
        webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		},
        width: 800, 
        height: 600
    });
    win.loadFile("index.html");
}
app.whenReady().then(() => {
    createWindow();
    app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });

ipcMain.on("getIcons", (event, message) => {
    console.log("requested");
    dialog.showOpenDialog(
        BrowserWindow.getFocusedWindow(), {
        properties: ["openDirectory"],
        filters: [{
            name: "All Files",
            extensions: ["*"]
        }]
    }).then ( result => {
        const path = result.filePaths[0];
        fs.copySync(`${path.replace("\\\\", "/")}/app/src/main/res/drawable-nodpi`, paths.join(__dirname, "/cache"));
        console.log("copied files");
        event.reply("allIcons", xmlparse.ByProjectPath(path));
        console.log("send");
    });
});