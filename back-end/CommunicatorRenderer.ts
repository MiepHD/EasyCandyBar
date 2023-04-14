const { contextBridge, ipcRenderer } = require("electron");
const CommunicatorR = {
    openProject: (id?: string | null): void => {
        if (!id) return;
        ipcRenderer.send("openProject", id);
    },
    openFolder: (type?: string | null): void => {
        if (!type) return;
        ipcRenderer.send("openFolder", type);
    },
    importRequest: (callback: Functions["void"]): void => {
        ipcRenderer.on("importedIcons", callback);
        ipcRenderer.send("importRequest");
    },
    getIcons: (type: string | undefined | null, callback: Functions["icons"]): void => {
        if (!type) return;
        ipcRenderer.on("Icons", (e: any, icons: Array<string>) => { callback(icons); });
        ipcRenderer.send("getIcons", type);
    },
    getIcon: (id: string | undefined | null, callback: Functions["icon"]): void => {
        if (!id) return;
        ipcRenderer.on("Icon", (e: any, icon: Icon) => { callback(icon); });
        ipcRenderer.send("getIcon", id);
    },
    setIcon: (id: string | undefined | null, imagechanged: boolean | undefined | null, icon: Icon | undefined | null, type: string | undefined | null, callback: Functions["void"]): void => {
        if (!id || !icon) return;
        if (!type) type = "finished";
        if (!imagechanged) imagechanged = false;
        ipcRenderer.on("savedIcon", callback);
        ipcRenderer.send("setIcon", id, imagechanged, icon, type);
    },
    chooseImagePath: (id: string | undefined | null, callback: Functions["void"]): void => {
        if (!id) return;
        ipcRenderer.on("savedImage", callback);
        ipcRenderer.send("chooseImagePath", id);
    },
    getProjectInfo: (callback: Functions["projectInfo"]): void => {
        ipcRenderer.on("ProjectInfo", (e: any, project: ProjectStructure) => { callback(project); });
        ipcRenderer.send("getProjectInfo");
    },
    GET: (path: string | undefined | null, callback: Functions["GETResponse"]): void => {
        if (!path) return;
        ipcRenderer.on("GETResponse", (e: any, file: string) => { callback(file); });
        ipcRenderer.send("GET", path);
    }
}
contextBridge.exposeInMainWorld("CommunicatorR", CommunicatorR);