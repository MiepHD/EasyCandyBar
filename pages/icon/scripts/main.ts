const { ipcRenderer } = require("electron"),
    params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop)});

let project: string;
ipcRenderer.send("getProjectInfo");
ipcRenderer.on("ProjectInfo", (data: any) => {
    project = data.id;
});
document.addEventListener("DOMContentLoaded", () => {
    if (params.icon) {
        ipcRenderer.send('getIcon', params.icon);
        $$("input[name=id]").value = params.icon;
    } else {
        $$("input[name=title]").onchange = (e: any) => {
            $$("input[name=id]").value = e.target.value.toLowerCase().replace(" ", "_");
        }
    }
    $$("input[name=type]").value = params.type;
    $$("img").src = `../../projects/${project}/${params.type}/${$$("input[name=id]").value}.png`;
    $$("a").href = `../list/list.html`;
    $$("button").addEventListener("click", () => {
        const id = $$("input[name=id]").value;
        if (id&&id!="") { ipcRenderer.send("chooseImagePath", id); }
        else { console.log("Name required")}
    });
});

ipcRenderer.on("Icon", (e: any, data: any) => {
    $$("input[name=title]").value = data.title;
    document.title = data.title;
    $$("input[name=description]").value = data.description;
    $$("input[name=category]").value = data.category;
    $$("input[name=package]").value = data.package;
    $$("input[name=activity]").value = data.activity;
});

ipcRenderer.on("savedImage", () => {
    $$("img").src = `cache/${$$("input[name=id]").value}.png`;
    $$("input[name=imagechanged]").checked = true;
});