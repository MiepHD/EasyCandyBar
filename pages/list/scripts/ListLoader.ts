class ListLoader {
    private params: URLSearchParams;
    public constructor() {
        const { ipcRenderer } = require("electron");
        this.params = new URLSearchParams(window.location.search);

        ipcRenderer.on("ProjectInfo", (e: any, info: ProjectStructure) => {
            document.title = info.title;
            ipcRenderer.on('Icons', (event: any, data: Array<string>) => {
                this.addIcons(info.id, data);
            });
            ipcRenderer.send('getIcons');
        });
        ipcRenderer.send("getProjectInfo");
    }
    /**
     * Adds an image for every icon
     * Important: received ProjectData
     * @param data Ids of icons
     */
    private addIcons(id: string, data: Array<string>): void {
        const type: string | null = this.params.get("type") ? this.params.get("type") : "finished";
        $$("a").href = `../icon/icon.html?type=${type}`;
        for (const drawable of data) {
            $("ul").append($(`<a href="../icon/icon.html?icon=${drawable}&type=${type}"><img src="../../projects/${id}/${type}/${drawable}.png"></a>`));
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new ListLoader();
    new SidebarLoader();
});