class ListLoader {
    private params: URLSearchParams;
    public constructor() {
        const { ipcRenderer } = require("electron");
        this.params = new URLSearchParams(window.location.search);
        window.addEventListener('resize', this.setColumns.bind(this));
        ipcRenderer.on("ProjectInfo", (e: any, info: ProjectStructure) => {
            $$("#open").addEventListener("click", () => { ipcRenderer.send("openFolder", this.params.get("type")); });
            new SidebarLoader(info.title);
            document.title = info.title;
            ipcRenderer.on('Icons', (e: any, data: Array<string>) => {
                this.addIcons(info.id, data);
            });
            ipcRenderer.send('getIcons', this.params.get("type"));
        });
        ipcRenderer.send("getProjectInfo");
    }
    /**
     * Calculates from min- and fullwidth how many icons can fit in a row
     * @returns Number of icons that fit in a row
     */
	private calcIconsPerLine(): number {
		const minwidth = $$("#ch")?.offsetWidth * 10;
		return Math.floor($$("body")?.clientWidth / minwidth);
	}
    /**
     * Resizes the list
     */
    private setColumns(): void {
        $$("ul").style.setProperty("--columns", this.calcIconsPerLine());
    }
    /**
     * Adds an image for every icon
     * Important: received ProjectData
     * @param data Ids of icons
     */
    private addIcons(id: string, data: Array<string>): void {
        this.setColumns();
        const type: string | null = this.params.get("type") ? this.params.get("type") : "finished";
        $$("a").href = `../icon/icon.html?type=${type}`;
        for (const drawable of data) {
            $("ul").append($(`<a href="../icon/icon.html?icon=${drawable}&type=${type}"><img src="../../projects/${id}/${type}/${drawable}.png"></a>`));
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new ListLoader();
});