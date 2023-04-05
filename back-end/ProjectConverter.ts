function convert(path: string): void {
    const xmlparse = require("./XmlDataExtractor");
    const data = xmlparse.ByProjectPath(path);
    const finished: Array<string> = Object.getOwnPropertyNames(data);
    const folders: Array<string> = path.split("\\");
    const id: string = folders[folders.length - 1];
    const fs = require("fs-extra");
    console.log("Copying images...");
    fs.copySync(`${path}/app/src/main/res/drawable-nodpi`, `projects/${id}/finished`);
    console.log("Copied images.\nGenerating icon's properties...");
    if (!fs.existsSync(`projects/${id}/properties/`)){ fs.mkdirSync(`projects/${id}/properties/`)}
    for (const key of Object.keys(data)) {
        fs.writeFileSync(`projects/${id}/properties/${key}.json`, JSON.stringify(data[key]));
    }
    console.log("Generated properties.\nCreating project's properties");
    fs.writeFileSync(`projects/${id}/project.json`, `{
        "id": "${id}",
        "title": "Unknown",
        "finished": ${JSON.stringify(finished)},
        "requested": []
    }`);
    fs.writeFileSync(`projects/${id}/config.json`, "{}");
    fs.writeFileSync(`projects/${id}/changelog.json`, "{}");
    console.log("Created project's properties.");
}

module.exports = convert;