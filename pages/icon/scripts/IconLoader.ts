/**
 * Loads information about the icon into the input fields if specified
 */
class IconLoader {
    private params: URLSearchParams;
    public constructor() {
        const { ipcRenderer } = require("electron");
        this.params = new URLSearchParams(window.location.search);

        ipcRenderer.on("Icon", this.fillOut);
        ipcRenderer.on("savedImage", this.loadNewImageFromCache);
        ipcRenderer.on("ProjectInfo", (e: any, data: ProjectStructure) => {
            new SidebarLoader(data.title);
            this.setImageSource(data);
        });
        $$("button")?.addEventListener("click", () => { this.chooseImage(ipcRenderer); });

        ipcRenderer.send("getProjectInfo");
        this.requestData(ipcRenderer);
    }
    /**
     * Fills the information of the received icon in the input fields
     */
    private fillOut(e: any, data: Icon): void {
        const typeselector = $$("select");
        if (typeselector) typeselector.value = new URLSearchParams(window.location.search).get("type") ? new URLSearchParams(window.location.search).get("type") : "finished";;
        $$("input[name=title]").value = data.title;
        document.title = data.title;
        $$("input[name=description]").value = data.description;
        $$("input[name=category]").value = data.category;
        $$("input[name=package]").value = data.package;
        $$("input[name=activity]").value = data.activity;
        $$("a").href = `../list/list.html?type=${typeselector.value}`;
    }
    /**
     * Loads the image from chooseImage() after it is successfully copied
     */
    private loadNewImageFromCache(): void {
        $$("img").src = `cache/${$$("input[name=id]").value}.png`;
        $$("input[name=imagechanged]").checked = true;
    }
    /**
     * @param data ProjectData (only the id is needed)
     */
    private setImageSource(data: ProjectStructure): void {
        $$("img").src = `../../projects/${data.id}/${$$("select").value}/${$$("input[name=id]").value}.png`;
    }
    /**
     * Lets the user choose an image to load
     */
    private chooseImage(ipcRenderer: any): void {
        const id: string = $$("input[name=id]").value;
        if (id&&id!="") { ipcRenderer.send("chooseImagePath", id); }
        else {
            /**
             * To-do: Show this on page
             */
            console.log("Name required");
        }
    }
    /**
     * Requests data for an icon if it's id is specified in params
     */
    private requestData(ipcRenderer: any): void {
        if (this.params.get("icon")) {
            ipcRenderer.send('getIcon', this.params.get("icon"));
            $$("input[name=id]").value = this.params.get("icon");
        } else {
            $$("input[name=title]").onchange = (e: any) => {
                $$("input[name=id]").value = e.target.value.toLowerCase().replace(" ", "_");
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new IconLoader();
});