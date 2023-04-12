import { XmlDeclarationAttributes } from "xml2js";

/**
 * Extracts data from XML Files
 */
export class XmlDataExtractor {
    private fs: any;
    private xml2js: any;
    private data: any;
    public constructor() {
        this.fs = require("fs");
        this.xml2js = require('xml2js');
        this.data = {};
    }
    /**
     * Brings the comment with the corresponding icon together in one line
     * @returns Edited string
     */
    private commentAndObjectTogether(xml: string): string {
        let count: number = 0;
        let result: string = "";
        for (let i: number = 0; i < xml.length; i++) {
            if (xml[i] === "\n") {
                count++;
                if (count === 3) {
                    count = 0;
                    continue;
                }
            }
            result += xml[i];
        }
        return result;
    }
    /**
     * Automatically searches for xml files in project
     * @param path Project path
     * @returns All icons with it's data as an object
     */
    public ByProjectPath(path: string): any {
        const search: Array<string> = ["drawable", "appfilter", "theme_resources", "appmap"];
        const files: Array<string> = [];
        for (const file of search) {
            const x = `${path}${file}.xml`;
            console.log(x);
            if (this.fs.existsSync(x)) files.push(file);
        }
        for (const file of files) {
            console.log(`Parsing ${file}...`);
            const filepath: string = `${path}${file}.xml`,
                xml: string = this.fs.readFileSync(filepath, "utf8");
            if ((!(files.includes("drawable"))) && file.includes("appfilter")) this.parseDrawable(this.commentAndObjectTogether(xml));
            if (file == "drawable") {
                this.parseDrawable(xml);
            } else {
                this.xml2js.parseString(xml, (err: any, result: any) => {
                    if (err) { console.error(err); }
                    else {
                        const dict: any = JSON.parse(this.fs.readFileSync("assets/xml2obj.json", "utf8"));
                        for (const item of result[dict[file]["root"]][dict[file]["item"]]) {
                            const othername: string = dict[file]["other"],
                                other: string = item.$[othername],
                                drawable: string = item.$[dict[file]["drawable"]];
                            if (!(drawable)) continue;
                            let packnactiv: Array<string>;
                            switch(file) {
                                case "appfilter":
                                    packnactiv = this.parseAppfilter(other);
                                    break;
                                case "theme_resources":
                                    packnactiv = this.parseThemeResources(other);
                                    break;
                                default:
                                case "appmap":
                                    packnactiv = ["Unknown", other];
                                    break;
                            }
                            this.addToData(packnactiv, drawable);
                        }
                    }
                });
            }
            console.log(`Parsed ${file}.`);
        };
        return this.data;
    }
    /**
     * Converts drawable to object including icon titles. Note: Automatically adds icons to data
     * @param xml A drawable.xml
     */
    private parseDrawable(xml: string): void {
        let category: string = "";
        for (const line of xml.split("\n")) {
            if (line.includes("category")) { category = line.split('"')[1]; }
            else if (line.includes("item")) {
                let drawable: string;
                const splitted: Array<string> = line.split('"');
                if (line.includes("component")) { drawable = splitted[3]; }
                else { drawable = splitted[1]; }
                if (drawable.includes(":")) continue;
                const title: string = this.getComment(line);
                this.data[drawable] = {
                    "category": category,
                    "title": title
                };
            }
        }
    }
    /**
     * Extracts XMLComment
     * @param line Single line from xml file
     * @returns Comment
     */
    private getComment(line: string): string {
        const r: RegExpMatchArray | null = line.match(/<!--(.+?)-->/);
        const comment = r ? r[1].trim() : "Unknown";
        return comment;
    }

    /**
     * Seperates package and activity for appfilter.xml
     * @param other Package and Activity combined
     * @returns Package and Activity seperated
     */
    private parseAppfilter(other: string): Array<string> {
        const packnactiv: Array<string> = ["Unknown", "Unknown"];
        if (other.includes("/") && other.includes("{") && other.includes("}")) {
            const splitother: Array<string> = other.split("/");
            packnactiv[0] = splitother[0].split("{")[1],
            packnactiv[1] = splitother[1].split("}")[0];
        } else { console.error("Syntax error"); }
        return packnactiv;
    }
    /**
     * Seperates package and activity for theme_resources.xml
     * @param other Package and Activity combined
     * @returns Package and Activity seperated
     */
    private parseThemeResources(other: string): Array<string> {
        let packnactiv: Array<string> = ["Unknown", "Unknown"];
        if (other.includes("/")) {
            packnactiv = other.split("/");
        } else { console.error("Syntax error"); }
        return packnactiv;
    }
    /**
     * Adds data of icon to this.data
     * @param packnactiv Package and Activity seperated
     * @param drawable Icon's id
     */
    private addToData(packnactiv: Array<string>, drawable: string): void {
        if (drawable in this.data) { 
            this.data[drawable]["package"] = packnactiv[0];
            this.data[drawable]["activity"] = packnactiv[1];
        } else {
            this.data[drawable] = {
                "package": packnactiv[0],
                "activity": packnactiv[1],
                "category": "None",
                "title": "Unknown"
            }
        }
    }
}