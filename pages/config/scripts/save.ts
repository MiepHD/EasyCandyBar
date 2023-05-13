config: {
	const params: URLSearchParams = new URLSearchParams(window.location.search);

	let data: any = {};
	for (const att of params.keys()) {
		data[att] = params.get(att);
	}
	RendererAPI.setConfig(data, () => {
		window.location.href = "config.html";
	});
}
