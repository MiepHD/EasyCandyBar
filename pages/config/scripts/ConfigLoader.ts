class ConfigLoader {
	private config: Configuration;
	public constructor() {
		//Prevents issue that config could not be defined
		this.config = {} as Configuration;
		RendererAPI.GET("./pages/config/res/structure.json", (file: string) => {
			$(`<form action="saving.html"></form>`).appendTo("body");
			const root = $("form");
			RendererAPI.getConfig((config: Configuration) => {
				this.config = config;
				this.load(JSON.parse(file), root);
				$(`<input type="submit" value="Submit" />"`).appendTo(root);
			});
		});
	}
	private load(structure: any, element: JQuery<HTMLElement>): void {
		const root = element[0] as HTMLFieldSetElement;
		for (const [k, v] of Object.entries(structure)) {
			switch (k) {
				default:
					const value = v as any;
					if (value.type) {
						switch (value.type) {
							case "radio":
								$(`
									<input type="${value.type}" name="${root.name}" value="${k}" id="${k}" />
									<label for="${k}">${value.name}</label>
								`).appendTo(root);
								break;
							case "text":
							case "color":
							case "checkbox":
								const checked = this.config[k] == true ? "checked" : "";
								$(`
									<input type="${value.type}" name="${k}" id="${k}" ${this.config[k]}/>
									<label for="${k}">${value.name}</label>
								`).appendTo(root);
								break;
							case "fieldset":
								$(`
									<fieldset id="${k}">
										<legend>${value.name}</legend>
									</fieldset>
								`).appendTo(root);
								if (value.toggle == true) {
									$(`
										<input type="checkbox" name="${k}" id="${k}_toggle" />
									`).appendTo($(`fieldset#${k}`));
								}
								this.load(value, $(`fieldset#${k}`));
							default:
						}
					}
				case "name":
				case "type":
				case "toggle":
			}
		}
	}
}
document.addEventListener("DOMContentLoaded", () => {
	new ConfigLoader();
});
