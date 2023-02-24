const xmlparse = require("./xmlDataExtractor"),
    paths = require("path"),
    fs = require("fs-extra");
let data = {};

function newProject(path, pname) {
    console.log("Extracting data...");
    const iconsdata = xmlparse.ByProjectPath(path);
    console.log("Extracted data.\nCopying icons...");
    fs.copySync(`${path}/app/src/main/res/drawable-nodpi`, "projects/unknown/icons");
    console.log("Copied icons.\nWriting project.json...");
    data = `
        {
            "projectinfo": { "package": "Unknown" },
            "iconsdata": ${JSON.stringify(iconsdata)}
        }
    `;
    fs.writeFileSync("projects/unknown/project.json", data);
    console.log("Wrote project.json.");
    data = JSON.parse(data);
    return data;
}

function existing(path) {
    data = JSON.parse(fs.readFileSync(`${path}/project.json`, { encoding: "utf8" }));
    const missingimages = [];
    for (filename of Object.keys(data.iconsdata)) {
        if (!(fs.existsSync(`${path}/icons/${filename}.png`))) missingimages.push(filename);
    }
    data["missingimages"] = missingimages;
    return data;
}

function getCurrentData() {
    console.log(data);
    return data;
}

module.exports = {
    new: newProject,
    existing,
    getCurrentData
}