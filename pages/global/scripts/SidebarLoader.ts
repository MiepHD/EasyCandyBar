class SidebarLoader {
    /**
     * This would be null if there were no response from back-end which (hopefully) won't happen
     */
    private sidebar: HTMLElement | null;
    private shown: boolean;
    constructor(pname: string) {
        this.sidebar = null;
        this.shown = false;
        RendererAPI.GET("./pages/global/sidebar.html", (content: string) => {
            $("body").prepend(content);
            const titleelement = $$("#pname");
            if (titleelement) titleelement.innerHTML = pname;
            this.sidebar = $$("nav");
            $$("body")?.style.setProperty("--distance", `calc(${titleelement?.offsetWidth}px + 1.5ch)`);
            this.load();
        });
    }
    private load(): void {
        $$("#menu")?.addEventListener("click", this.toggle.bind(this));
    }
    private show(): void {
        this.sidebar?.setAttribute("state", "shown");
        $$("#menu")?.setAttribute("aria-expanded", "true");
        this.shown = true;
    }
    private hide(): void {
        this.sidebar?.setAttribute("state", "hidden");
		$$("#menu")?.setAttribute("aria-expanded", "false");
		this.shown = false;
    }
    private toggle(): void {
        if (this.shown) { this.hide() }
        else { this.show() }
    }
}