const xmlparse = require("./xmlDataExtractor"),
    paths = require("path"),
    fs = require("fs-extra");

function newProject(path, pname) {
    const iconsdata = {};
    iconsdata["iconsdata"] = xmlparse.ByProjectPath(path);
    console.log("extracted data");
    fs.copySync(`${path}/app/src/main/res/drawable-nodpi`, paths.join(__dirname, `/projects/unknown/icons`));
    console.log("copied icons");
    fs.writeFileSync(`projects/unknown/project.json`, `
        {
            "projectinfo": { "package": "Unknown" },
            "iconsdata": ${JSON.stringify(iconsdata)}
        }
    `);
    console.log("wrote project.json");
    iconsdata["projectinfo"] = { "package": "unknown" };
    return iconsdata;
}

function existingProject(path) {
    const data = JSON.parse(fs.readFileSync(`${path}/project.json`, { encoding: "utf8" }));
    const missingimages = [];
    for (filename of Object.keys(data.iconsdata)) {
        if (!(fs.existsSync(`${path}/icons/${filename}.png`))) missingimages.push(filename);
    }
    data["missingimages"] = missingimages;
    return data;
}

module.exports = {
    new: newProject,
    existing: existingProject
}