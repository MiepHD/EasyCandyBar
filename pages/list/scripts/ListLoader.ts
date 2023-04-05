class ListLoader {
    private params: URLSearchParams;
    /**
     * This won't return null but to prevent Typescript error it is part of the declaration
     */
    private type: string | null;
    public constructor() {
        const { ipcRenderer } = require("electron");
        this.params = new URLSearchParams(window.location.search);
        this.type = this.params.get("type") ? this.params.get("type") : "finished";

        ipcRenderer.on("ProjectInfo", (e: any, info: ProjectStructure) => {
            document.title = info.title;
            ipcRenderer.on('Icons', (event: any, data: Array<string>) => {
                this.addIcons(info.id, data);
            });
            ipcRenderer.send('getIcons', this.type);
        });
        ipcRenderer.send("getProjectInfo");
    }
    /**
     * Adds an image for every icon
     * Important: received ProjectData
     * @param data Ids of icons
     */
    private addIcons(id: string, data: Array<string>): void {
        $$("a").href = `../icon/icon.html?type=${this.type}`;
        for (const drawable of data) {
            $("ul").append($(`<a href="../icon/icon.html?icon=${drawable}&type=${this.type}"><img src="../../projects/${id}/${this.type}/${drawable}.png"></a>`));
        }
    }
}
document.addEventListener("DOMContentLoaded", () => { new ListLoader(); });