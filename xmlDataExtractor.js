const fs = require("fs");
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

function ByProjectPath(path) {
    const data = {};
    path = `${path}/app/src/main/res/`;
    const files = ["drawable", "appfilter", "appmap", "theme_resources"];
    for (const file of files) {
        const filepath = `${path}xml/${file}.xml`
        const xml = fs.readFileSync(filepath, "utf8");
        if (file == "drawable") {
            let category = "";
            for (line of xml.split("\n")) {
                if (line.includes("category")) {
                    category = line.split('"')[1];
                } else if (line.includes("item")) {
                    const drawable = line.split('"')[1];
                    const match = line.match(/<!--(.+?)-->/);
                    let title;
                    try {
                        title = match[1].trim();
                    } catch {
                        title = "Unknown"
                    }
                    data[drawable] = {
                        "category": category,
                        "title": title
                    };
                }
            }
        } else {
            xml2js.parseString(xml, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    if (file == "appfilter") {
                        for (const item of result.resources.item) {
                            const { component , drawable } = item.$;
                            if (drawable in data) {
                                data[drawable]["component"] = component;
                            } else {
                                data[drawable] = {
                                    "component": component,
                                    "category": "None",
                                    "title": "Unknown"
                                }
                            }
                        }
                    } else if (file == "appmap") {
                        for (const item of result.appmap.item) {
                            const { "class": className , "image": drawable } = item.$;
                            if (drawable in data) {
                                data[drawable]["class"] = className;
                            } else {
                                data[drawable] = {
                                    "class": className,
                                    "category": "None",
                                    "title": "Unknown"
                                }
                            }
                        }
                    }
                }
            });
        }
    };
    return data;
}

module.exports = {
    ByProjectPath: ByProjectPath
}