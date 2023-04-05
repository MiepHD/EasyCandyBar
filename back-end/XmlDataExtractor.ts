const { parse } = require("path");

const fs = require("fs"),
    xml2js = require('xml2js'),
    parser = new xml2js.Parser();

function ByProjectPath(path: string): any {
    const data: any = {},
        files: Array<string> = ["drawable", "appfilter", "theme_resources", "appmap"];
    let index: number = 0;
    path = `${path}/app/src/main/res/`;
    for (const file of files) {
        if (!(fs.existsSync(`${path}xml/${file}.xml`))) files.splice(index);
        index++;
    }
    for (const file of files) {
        console.log(`Parsing ${file}...`);
        const filepath: string = `${path}xml/${file}.xml`,
            xml: string = fs.readFileSync(filepath, "utf8");
        if (file == "drawable") {
            parseDrawable(data, xml);
        } else {
            xml2js.parseString(xml, (err: any, result: any) => {
                if (err) { console.error(err); }
                else {
                    const dict: any = JSON.parse(fs.readFileSync("assets/xml2obj.json", "utf8"));
                    for (const item of result[dict[file]["root"]][dict[file]["item"]]) {
                        const othername: string = dict[file]["other"],
                            other: string = item.$[othername],
                            drawable: string = item.$[dict[file]["drawable"]];
                        let packnactiv: Array<string> = ["Unknown", "Unknown"];
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
        console.log(`Parsed ${file}.`);
    };
    return data;
}

function parseDrawable(data: any, xml: string): void {
    let category = "";
    for (const line of xml.split("\n")) {
        if (line.includes("category")) { category = line.split('"')[1]; }
        else if (line.includes("item")) {
            const drawable: string = line.split('"')[1],
                title: string = getComment(line);
            data[drawable] = {
                "category": category,
                "title": title
            };
        }
    }
}

function parseAppfilter(other: string, packnactiv: Array<string>): Array<string> {
    if (other.includes("/") && other.includes("{") && other.includes("}")) {
        const splitother = other.split("/");
        packnactiv[0] = splitother[0].split("{")[1],
        packnactiv[1] = splitother[1].split("}")[0];
    } else { console.error("Syntax error"); }
    return packnactiv;
}

function parseThemeResources(other: string, packnactiv: Array<string>): Array<string> {
    if (other.includes("/")) {
        packnactiv = other.split("/");
    } else { console.error("Syntax error"); }
    return packnactiv;
}

function addToData(data: any, packnactiv: Array<string>, drawable: string): any {
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

function getComment(line: string): string {
    let comment;
    try { comment = line.match(/<!--(.+?)-->/)[1].trim(); } catch { comment = "Unknown" }
    return comment;
}

module.exports = { ByProjectPath };