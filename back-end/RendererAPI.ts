const { contextBridge, ipcRenderer } = require("electron");
const RendererAPI = {
    addImagesListener: (callback: Functions["void"]): void => {
        ipcRenderer.on("ImagesLoaded", callback);
    },
    /**
     * Opens a project by id
     * @param id Project's id
     */
    openProject: (id?: string | null): void => {
        if (!id) return;
        ipcRenderer.send("openProject", id);
    },
    /**
     * Opens the finished or the requested folder in an explorer window
     * @param type "finished" or "requested"
     */
    openFolder: (type?: string | null): void => {
        if (!type) return;
        ipcRenderer.send("openFolder", type);
    },
    /**
     * Imports a icon request
     * @param callback Called when import is finished
     */
    importRequest: (callback: Functions["void"]): void => {
        ipcRenderer.on("importedIcons", callback);
        ipcRenderer.send("importRequest");
    },
    /**
     * Loads the list of icons for selected type 
     * @param type "finished" or "requested"
     */
    getIcons: (type: string | undefined | null, callback: Functions["icons"]): void => {
        if (!type) return;
        ipcRenderer.on("Icons", (e: any, icons: Array<string>) => { callback(icons); });
        ipcRenderer.send("getIcons", type);
    },
    /**
     * Loads information about an icon
     * @param id Icon's id
     */
    getIcon: (id: string | undefined | null, callback: Functions["icon"]): void => {
        if (!id) return;
        ipcRenderer.on("Icon", (e: any, icon: Icon) => { callback(icon); });
        ipcRenderer.send("getIcon", id);
    },
    /**
     * Saves the information about an icon
     * @param id Icon's id
     * @param imagechanged If the image has been changed. Note: The image must be located in the cache with the icon's id
     * @param icon The icon's data
     * @param type Seperated from data
     * @param callback Called when successfully saved
     */
    setIcon: (id: string | undefined | null, imagechanged: boolean | undefined | null, icon: Icon | undefined | null, type: string | undefined | null, callback: Functions["void"]): void => {
        if (!id || !icon) return;
        if (!type) type = "finished";
        if (!imagechanged) imagechanged = false;
        ipcRenderer.on("savedIcon", callback);
        ipcRenderer.send("setIcon", id, imagechanged, icon, type);
    },
    /**
     * Lets user choose an image that then gets copied to the cache
     * @param id Icon's id
     * @param callback When image successfully saved
     */
    chooseImagePath: (id: string | undefined | null, callback: Functions["void"]): void => {
        if (!id) return;
        ipcRenderer.on("savedImage", callback);
        ipcRenderer.send("chooseImagePath", id);
    },
    /**
     * Gets current project id and title
     * 
     * Note: Lets user choose a path if there's no project loaded yet
     * @param callback project doesn't contain requested and finished
     */
    getProjectInfo: (callback: Functions["projectInfo"]): void => {
        ipcRenderer.on("ProjectInfo", (e: any, project: ProjectStructure) => { callback(project); });
        ipcRenderer.send("getProjectInfo");
    },
    /**
     * Loads a file
     * 
     * Note: Path's origin is /back-end/
     * @param path Absolute path or relative path from /back-end/
     */
    GET: (path: string | undefined | null, callback: Functions["GETResponse"]): void => {
        if (!path) return;
        ipcRenderer.on("GETResponse", (e: any, file: string) => { callback(file); });
        ipcRenderer.send("GET", path);
    }
}
contextBridge.exposeInMainWorld("RendererAPI", RendererAPI);