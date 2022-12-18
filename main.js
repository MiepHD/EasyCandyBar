const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const xmlparse = require("./xmlDataExtractor");

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
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})

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
        event.reply("allIcons", xmlparse.ByProjectPath(result.filePaths[0]));
        console.log("send");
    });
});