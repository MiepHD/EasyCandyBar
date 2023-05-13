class Saver {
	public constructor() {
		RendererAPI.GET("./pages/config/res/Configuration.json", (file: string) => {
			this.convertData(JSON.parse(file));
		});
	}
	private convertData(configuration: any): void {
		const params = new URLSearchParams(window.location.search);
		let data: any = {};
		for (const att of Object.keys(configuration)) {
			const value: string | null = params.get(att);
			switch (configuration[att]) {
				case "string":
					data[att] = value ? value : "";
					break;
				case "boolean":
					data[att] = value == "true";
					break;
				case "number":
					data[att] = value ? value : 0;
					break;
				case "Array<string>":
					const array: Array<string> | undefined = value?.split("\n");
					data[att] = array ? array : [""];
				default:
			}
		}
		this.send(data);
	}
	private send(data: Configuration): void {
		RendererAPI.setConfig(data);
		window.location.href = "config.html";
	}
}
document.addEventListener("DOMContentLoaded", () => {
	new Saver();
});
