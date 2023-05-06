import { PathChooser } from "./PathChooser";
import { Project } from "./Project";
import { FileHandler } from "./FileHandler";
import { DataConverter } from "./DataConverter";

import { app, BrowserWindow, ipcMain } from "electron";
const fs: FileHandler = new FileHandler(),
	convert: DataConverter = new DataConverter();
let win: any;
//Launches the app
const createWindow = () => {
	const path: any = require("path");
	win = new BrowserWindow({
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, "./RendererAPI.js")
		},
		width: 1280,
		height: 720,
		minWidth: 600,
		minHeight: 600
	});
	win.loadFile("pages/home/home.html");
};

//For closing the app
app.whenReady().then(() => {
	createWindow();
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

//Variables
let currentProject: Project;

ipcMain.on("openProject", (e: any, id: string) => {
	currentProject = new Project(id);
});

ipcMain.on("openFolder", (e: any, type: string) => {
	ensureProject(e, () => {
		switch (type) {
			case "requested":
				fs.openFolder(`projects/${currentProject.id}/requested`);
				break;
			default:
			case "finished":
				fs.openFolder(`projects/${currentProject.id}/finished`);
				break;
		}
	});
});

ipcMain.on("importRequest", (e: any) => {
	new PathChooser().zip().then((path: string) => {
		if (path.includes("canceled")) return;
		console.log("Loading zip to cache...");
		fs.newDir("cache/").then(() => {
			fs.copyFile(path, "cache/request.zip").then(() => {
				console.log("Loaded zip to cache.");
				fs.extractZip("cache/request.zip").then(() => {
					convert.request("cache/extracted/", currentProject.id).then((data: any) => {
						for (const icon of Object.getOwnPropertyNames(data)) {
							currentProject.setIconCategory(icon, "requested");
							currentProject.fs.saveIconProperties(icon, data[icon]);
						}
						fs.deleteDir("cache");
						e.reply("importedIcons");
					});
				});
			});
		});
	});
});

ipcMain.on("getIcons", (e: any, type: string) => {
	ensureProject(e, () => {
		switch (type) {
			case "requested":
				e.reply("Icons", currentProject.getRequestedIcons());
				break;
			default:
			case "finished":
				e.reply("Icons", currentProject.getFinishedIcons());
				break;
		}
	});
});

ipcMain.on("getIcon", (e: any, id: string) => {
	e.reply("Icon", currentProject.fs.loadIconProperties(id));
});

ipcMain.on("setIcon", (e: any, id: string, imagechanged: boolean, icon: any, type: string) => {
	if (imagechanged) {
		console.log("Copying new file...");
		fs.copyFile(`pages/icon/cache/${id}.png`, `projects/${currentProject.id}/${type}/${id}.png`).then(() => {
			console.log("Copied new file.\nClearing cache...");
			fs.deleteDir("pages/icon/cache/").then(() => {
				console.log("Cleared cache.");
			});
			currentProject.setIconCategory(id, type);
		});
	} else {
		currentProject.setIconCategory(id, type);
	}
	currentProject.fs.saveIconProperties(id, icon);
	console.log("Icon saved successfully.");
	e.reply("savedIcon");
});

ipcMain.on("getConfig", (e: any) => {});

ipcMain.on("setConfig", (e: any, data: any) => {});

ipcMain.on("getChangelog", (e: any) => {});

ipcMain.on("setChangelog", (e: any, data: any) => {});

ipcMain.on("chooseImagePath", (e: any, id: string) => {
	new PathChooser().image().then((path: string) => {
		if (path.includes("canceled")) return;
		console.log("Loading image to cache...");
		fs.newDir("pages/icon/cache/").then(() => {
			fs.copyFile(path, `pages/icon/cache/${id}.png`).then(() => {
				console.log("Loaded image to cache.");
				e.reply("savedImage");
			});
		});
	});
});

ipcMain.on("getProjectInfo", (e: any) => {
	ensureProject(e, () => {
		e.reply("ProjectInfo", {
			id: currentProject.id,
			title: currentProject.title
		});
	});
});

ipcMain.on("GET", (e: any, path: string) => {
	e.reply("GETResponse", fs.read(path));
});

function ensureProject(e: any, callback: Function): void {
	if (!currentProject) {
		new PathChooser().dir().then((path: string) => {
			if (path.includes("canceled")) {
				win.loadFile("pages/home/home.html");
				return;
			}
			switch (fs.getProjectType(path)) {
				default:
				case "none":
					ensureProject(e, callback);
					break;
				case "pack":
					convert.project(path, () => {
						e.reply("ImagesLoaded");
					});
				case "project":
					currentProject = new Project(fs.extractFolderName(path));
					callback();
			}
		});
	} else {
		callback();
	}
}
