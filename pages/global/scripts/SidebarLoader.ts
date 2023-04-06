class SidebarLoader {
    constructor() {
        const { ipcRenderer } = require("electron");
        ipcRenderer.on("GETResponse", (e: any, content: string) => {
            $("body").prepend(content);
        });
        ipcRenderer.send("GET", "./pages/global/sidebar.html");
    }
}