const { app, BrowserWindow, ipcMain } = require("electron"),
    loadproject = require("./loadProject"),
    choose = require("./pathChooser"),
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

//Global variables
let currentProject = "none";

//Functions
ipcMain.on("loadProject", e => {
    console.log("requested");
    choose.dir().then(ppath => {
        const data = fs.existsSync(`${ppath}/project.json`) ? loadproject.existing(ppath) : loadproject.new(ppath);
        const returndata = JSON.parse(`${JSON.stringify(data)}`);
        console.log("Filtering iconsdata...");
        for (key of Object.keys(data["iconsdata"])) {
            delete returndata["iconsdata"][key]["package"];
            delete returndata["iconsdata"][key]["activity"];
        }
        currentProject = returndata.projectinfo.package;
        console.log("Filtered iconsdata.");
        e.reply("allIcons", returndata);
        console.log("Sent data.");
    });
});

ipcMain.on("loadProjectByName", (e, pname) => {
    currentProject = pname;
    e.reply("allIcons", loadproject.existing(`projects/${pname}`));
    console.log("Sent iconsdata");
});

ipcMain.on("getIcon", (e, icon) => {
    e.reply("Icon", loadproject.getCurrentData()["iconsdata"][icon]);
    console.log("Sent icon");
});

ipcMain.on("chooseImagePath", (e, id) => {choose.image().then(ipath => {
    if (!fs.existsSync("pages/icon/cache/")){ fs.mkdirSync("pages/icon/cache/")}
    fs.copyFileSync(ipath, `pages/icon/cache/${id}.png`);
    e.reply("savedImage");
})});

ipcMain.on("saveIcon", (e, data) => {
    if (data.imagechanged) {
        console.log("Copying new file...");
        fs.copyFileSync(`pages/icon/cache/${data.id}.png`, `projects/${currentProject}/icons/${data.id}.png`);
        console.log("Copied new file.\nClearing cache...");
        fs.rmSync("pages/icon/cache/", { recursive: true, force: true });
        console.log("Cleared cache.");
    }
    console.log("Changing project.json...");
    const fulldata = JSON.parse(fs.readFileSync(`projects/${currentProject}/project.json`, "utf-8"));
    fulldata["iconsdata"][data.id] = data["iconsdata"];
    fs.writeFileSync(`projects/${currentProject}/project.json`, JSON.stringify(fulldata));
    console.log("Changed project.json.");
    e.reply("savedIcon");
});