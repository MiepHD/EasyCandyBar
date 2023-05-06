const params: URLSearchParams = new URLSearchParams(window.location.search);

let data: any = {};
for (const att of ["title", "description", "category", "package", "activity"]) {
	data[att] = params.get(att);
}
RendererAPI.setIcon(params.get("id"), params.get("imagechanged") == "true", data, params.get("type"), () => {
	window.location.href = `../list/list.html?type=${params.get("type")}`;
});
