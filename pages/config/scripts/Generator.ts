class Generator {
	public static Config(structure: any, root: JQuery) {
		for (const [k, v] of Object.entries(structure)) {
			switch (k) {
				default:
					if (v["type"]) {
						switch (v["type"]) {
							case "radio":
								$(`
									<fieldset id="${k}">
										<legend>${v["name"]}</legend>
									</fieldset>
								`).appendTo(root);
								for (const [option, description] of Object.entries(v["options"])) {
									$(`
										<label for="${k}_${option}">${description["name"]}</label>
										<input type="radio" name="${k}" id="${k}_${option}" />
									`).appendTo($(`fieldset#${k}`));
								}
								break;
							case "text":
							case "color":
							case "checkbox":
								$(`
									<label for="${k}">${v["name"]}</label>
									<input type="${v["type"]}" name="${k} id="${k}" />
								`).appendTo(root);
								break;
							case "fieldset":
								$(`
									<fieldset id="${k}>
										<legend>${v["name"]}</legend>
									</fieldset>
								`).appendTo(root);
								if (v["toggle"] == true) {
									$(`
										<input type="checkbox" name="${k}" id="${k}_toggle" />
									`).appendTo($(`fieldset#${k}`));
								}
								this.Config(v, $(`fieldset#${k}`));
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
