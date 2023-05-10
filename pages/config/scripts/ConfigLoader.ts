class ConfigLoader {
	public constructor() {
		RendererAPI.GET("./pages/config/res/structure.json", (file: string) => {
			this.load(JSON.parse(file), $(`body`));
		});
	}
	private load(structure: any, element: JQuery<HTMLElement>) {
		const root = element[0];
		for (const [k, v] of Object.entries(structure)) {
			switch (k) {
				default:
					const value = v as any;
					if (value.type) {
						switch (value.type) {
							case "radio":
								$(`
									<fieldset id="${k}">
										<legend>${value.name}</legend>
									</fieldset>
								`).appendTo(root);
								for (const [option, description] of Object.entries(value.options)) {
									const desc = description as any;
									$(`
										<input type="radio" name="${k}" id="${k}_${option}" />
										<label for="${k}_${option}">${desc["name"]}</label>
									`).appendTo($(`fieldset#${k}`));
								}
								break;
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

new ConfigLoader();
