class ConfigLoader {
	public constructor() {
		RendererAPI.GET("./pages/config/res/structure.json", (file: string) => {
			$(`<form action="saving.html"></form>`).appendTo("body");
			const root = $("form");
			this.load(JSON.parse(file), root);
			$(`<input type="submit" value="Submit" />"`).appendTo(root);
		});
	}
	private load(structure: any, element: JQuery<HTMLElement>): void {
		const root = element[0];
		for (const [k, v] of Object.entries(structure)) {
			switch (k) {
				default:
					const value = v as any;
					if (value.type) {
						switch (value.type) {
							case "radio":
							case "text":
							case "color":
							case "checkbox":
								$(`
									<input type="${value.type}" name="${k} id="${k}" />
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
								this.load(v, $(`fieldset#${k}`));
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
