const { parse } = require("path");

const fs = require("fs"),
    xml2js = require('xml2js'),
    parser = new xml2js.Parser();

function ByProjectPath(path) {
    const data = {},
        files = ["drawable", "appfilter", "theme_resources", "appmap"];
    let index = 0;
    path = `${path}/app/src/main/res/`;
    for (const file of files) {
        if (!(fs.existsSync(`${path}xml/${file}.xml`))) files.splice(index);
        index++;
    }
    for (const file of files) {
        const filepath = `${path}xml/${file}.xml`,
            xml = fs.readFileSync(filepath, "utf8");
        if (file == "drawable") {
            parseDrawable(data, xml);
        } else {
            xml2js.parseString(xml, (err, result) => {
                if (err) { console.error(err); }
                else {
                    const dict = JSON.parse(fs.readFileSync("assets/xml2obj.json", "utf8"));
                    for (const item of result[dict[file]["root"]][dict[file]["item"]]) {
                        const othername = dict[file]["other"],
                            other = item.$[othername],
                            drawable = item.$[dict[file]["drawable"]];
                        let packnactiv = ["Unknown", "Unknown"];
                        switch(file) {
                            case "appfilter":
                                packnactiv = parseAppfilter(other, packnactiv);
                                break;
                            case "theme_resources":
                                packnactiv = parseThemeResources(other, packnactiv);
                                break;
                            default:
                            case "appmap":
                                packnactiv[1] = other;
                                break;
                        }
                        addToData(data, packnactiv, drawable);
                    }
                }
            });
        }
    };
    return data;
}

function parseDrawable(data, xml) {
    let category = "";
    for (line of xml.split("\n")) {
        if (line.includes("category")) { category = line.split('"')[1]; }
        else if (line.includes("item")) {
            const drawable = line.split('"')[1],
                title = getComment(line);
            data[drawable] = {
                "category": category,
                "title": title
            };
        }
    }
}

function parseAppfilter(other, packnactiv) {
    if (other.includes("/") && other.includes("{") && other.includes("}")) {
        const splitother = other.split("/");
        packnactiv[0] = splitother[0].split("{")[1],
        packnactiv[1] = splitother[1].split("}")[0];
    } else { console.error("Syntax error"); }
    return packnactiv;
}

function parseThemeResources(other, packnactiv) {
    if (other.includes("/")) {
        packnactiv = other.split("/");
    } else { console.error("Syntax error"); }
    return packnactiv;
}

function addToData(data, packnactiv, drawable) {
    if (drawable in data) { 
        data[drawable]["package"] = packnactiv[0];
        data[drawable]["activity"] = packnactiv[1];
    } else {
        data[drawable] = {
            "package": packnactiv[0],
            "activity": packnactiv[1],
            "category": "None",
            "title": "Unknown"
        }
    }
}

function getComment(line) {
    const match = line.match(/<!--(.+?)-->/);
    let comment;
    try { comment = match[1].trim(); } catch { comment = "Unknown" }
    return comment;
}

module.exports = { ByProjectPath: ByProjectPath }