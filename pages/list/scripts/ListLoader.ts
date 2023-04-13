class ListLoader {
    private readonly params: URLSearchParams;
    private readonly ipcRenderer: any;
    private rowlength: number;
    public constructor() {
        const { ipcRenderer } = require("electron");
        this.ipcRenderer = ipcRenderer;
        this.rowlength = 0;
        this.params = new URLSearchParams(window.location.search);
        window.addEventListener('resize', this.setColumns.bind(this));
        this.loadProject();
    }
    /**
     * Calculates from min- and fullwidth how many icons can fit in a row
     * @returns Number of icons that fit in a row
     */
	private calcIconsPerLine(): number {
		const minwidth = $$("#icon-size")?.offsetWidth;
		return Math.floor($$("body")?.clientWidth / minwidth);
	}
    /**
     * Resizes the list
     */
    private setColumns(): void {
        this.rowlength = this.calcIconsPerLine();
        $$("ul").style.setProperty("--columns", this.rowlength);
    }
    /**
     * Adds an image for every icon
     * Important: received ProjectData
     * @param data Ids of icons
     */
    private addIcons(id: string): void {
        this.setColumns();
        const type: string | null = this.params.get("type") ? this.params.get("type") : "finished";
        $$("a").href = `../icon/icon.html?type=${type}`;
        this.ipcRenderer.on('Icons', (e: any, data: Array<string>) => {
            const list: JQuery<HTMLElement> = $("ul");
            list.append($(`<div id="continuous"></div>`));
            const observer: IntersectionObserver = new IntersectionObserver((entries: Array<IntersectionObserverEntry>) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        for (let i = 0; i < (this.rowlength * 5); i++) {
                            const drawable: string = data[data.length - 1];
                            $(`<a href="../icon/icon.html?icon=${drawable}&type=${type}"><img src="../../projects/${id}/${type}/${drawable}.png"></a>`).insertBefore($$("#continuous"));
                            data.pop();
                            if (data.length == 0) break;
                        }
                        if (data.length > 0) {
                            $$("#continuous").remove();
                            list.append($(`<div id="continuous"></div>`));
                            observer.observe($$("#continuous"));
                        }
                    }
                }
            });
            observer.observe($$("#continuous"));
        });
        this.ipcRenderer.send('getIcons', this.params.get("type"));
    }
    /**
     * Gets the project information and fills it into the page
     * 
     * Triggers addIcons
     */
    private loadProject(): void {
        this.ipcRenderer.on("ProjectInfo", (e: any, info: ProjectStructure) => {
            $$("#open").addEventListener("click", () => { this.ipcRenderer.send("openFolder", this.params.get("type")); });
            $$("#import").addEventListener("click", () => {
                this.ipcRenderer.on("importedIcons", () => {
                    location.reload();
                });
                this.ipcRenderer.send("importRequest");
            });
            new SidebarLoader(info.title);
            document.title = info.title;
            this.addIcons(info.id);
        });
        this.ipcRenderer.send("getProjectInfo");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new ListLoader();
});