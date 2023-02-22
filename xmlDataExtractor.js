const fs = require("fs");
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

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
        } else {
            xml2js.parseString(xml, (err, result) => {
                if (err) { console.error(err); }
                else {
                    const dict = JSON.parse(fs.readFileSync("xml2obj.json", "utf8"));
                    for (const item of result[dict[file]["root"]][dict[file]["item"]]) {
                        const othername = dict[file]["other"],
                            other = item.$[othername],
                            drawable = item.$[dict[file]["drawable"]];
                        let packnactiv = [],
                            package = "Unknown",
                            activity = "Unknown";
                        switch(file) {
                            case "appfilter":
                                if (other.includes("/") && other.includes("{") && other.includes("}")) {
                                    packnactiv = other.split("/");
                                    package = packnactiv[0].split("{")[1];
                                    activity = packnactiv[1].split("}")[0];
                                } else { console.error("Syntax error"); }
                                break;
                            case "theme_resources":
                                if (other.includes("/")) {
                                    packnactiv = other.split("/");
                                    package = packnactiv[0];
                                    activity = packnactiv[1];
                                } else { console.error("Syntax error"); }
                                break;
                            default:
                            case "appmap":
                                activity = other;
                                break;
                        }
                        if (drawable in data) { 
                            data[drawable]["package"] = package;
                            data[drawable]["activity"] = activity;
                        }
                        else {
                            data[drawable] = {
                                "package": package,
                                "activity": activity,
                                "category": "None",
                                "title": "Unknown"
                            }
                        }
                    }
                }
            });
        }
    };
    return data;
}

function getComment(line) {
    const match = line.match(/<!--(.+?)-->/);
    let comment;
    try { comment = match[1].trim(); } catch { comment = "Unknown" }
    return comment;
}

module.exports = { ByProjectPath: ByProjectPath }