"use strict";
const { parse } = require("path");
<<<<<<<< HEAD:back-end/XmlDataExtractor.ts

const fs = require("fs"),
    xml2js = require('xml2js'),
    parser = new xml2js.Parser();

function ByProjectPath(path: string): any {
    const data: any = {},
        files: Array<string> = ["drawable", "appfilter", "theme_resources", "appmap"];
    let index: number = 0;
========
const fs = require("fs"), xml2js = require('xml2js'), parser = new xml2js.Parser();
function ByProjectPath(path) {
    const data = {}, files = ["drawable", "appfilter", "theme_resources", "appmap"];
    let index = 0;
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:back-end/xmlDataExtractor.js
    path = `${path}/app/src/main/res/`;
    for (const file of files) {
        if (!(fs.existsSync(`${path}xml/${file}.xml`)))
            files.splice(index);
        index++;
    }
    for (const file of files) {
<<<<<<<< HEAD:back-end/XmlDataExtractor.ts
        const filepath: string = `${path}xml/${file}.xml`,
            xml: string = fs.readFileSync(filepath, "utf8");
        if (file == "drawable") {
            parseDrawable(data, xml);
        } else {
            xml2js.parseString(xml, (err: any, result: any) => {
                if (err) { console.error(err); }
========
        const filepath = `${path}xml/${file}.xml`, xml = fs.readFileSync(filepath, "utf8");
        if (file == "drawable") {
            parseDrawable(data, xml);
        }
        else {
            xml2js.parseString(xml, (err, result) => {
                if (err) {
                    console.error(err);
                }
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:back-end/xmlDataExtractor.js
                else {
                    const dict: any = JSON.parse(fs.readFileSync("assets/xml2obj.json", "utf8"));
                    for (const item of result[dict[file]["root"]][dict[file]["item"]]) {
<<<<<<<< HEAD:back-end/XmlDataExtractor.ts
                        const othername: string = dict[file]["other"],
                            other: string = item.$[othername],
                            drawable: string = item.$[dict[file]["drawable"]];
                        let packnactiv: Array<string> = ["Unknown", "Unknown"];
                        switch(file) {
========
                        const othername = dict[file]["other"], other = item.$[othername], drawable = item.$[dict[file]["drawable"]];
                        let packnactiv = ["Unknown", "Unknown"];
                        switch (file) {
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:back-end/xmlDataExtractor.js
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
    }
    ;
    return data;
}
<<<<<<<< HEAD:back-end/XmlDataExtractor.ts

function parseDrawable(data: any, xml: string): void {
    let category = "";
    for (const line of xml.split("\n")) {
        if (line.includes("category")) { category = line.split('"')[1]; }
        else if (line.includes("item")) {
            const drawable: string = line.split('"')[1],
                title: string = getComment(line);
========
function parseDrawable(data, xml) {
    let category = "";
    for (const line of xml.split("\n")) {
        if (line.includes("category")) {
            category = line.split('"')[1];
        }
        else if (line.includes("item")) {
            const drawable = line.split('"')[1], title = getComment(line);
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:back-end/xmlDataExtractor.js
            data[drawable] = {
                "category": category,
                "title": title
            };
        }
    }
}
<<<<<<<< HEAD:back-end/XmlDataExtractor.ts

function parseAppfilter(other: string, packnactiv: Array<string>): Array<string> {
========
function parseAppfilter(other, packnactiv) {
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:back-end/xmlDataExtractor.js
    if (other.includes("/") && other.includes("{") && other.includes("}")) {
        const splitother = other.split("/");
        packnactiv[0] = splitother[0].split("{")[1],
            packnactiv[1] = splitother[1].split("}")[0];
    }
    else {
        console.error("Syntax error");
    }
    return packnactiv;
}
<<<<<<<< HEAD:back-end/XmlDataExtractor.ts

function parseThemeResources(other: string, packnactiv: Array<string>): Array<string> {
========
function parseThemeResources(other, packnactiv) {
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:back-end/xmlDataExtractor.js
    if (other.includes("/")) {
        packnactiv = other.split("/");
    }
    else {
        console.error("Syntax error");
    }
    return packnactiv;
}
<<<<<<<< HEAD:back-end/XmlDataExtractor.ts

function addToData(data: any, packnactiv: Array<string>, drawable: string): any {
    if (drawable in data) { 
========
function addToData(data, packnactiv, drawable) {
    if (drawable in data) {
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:back-end/xmlDataExtractor.js
        data[drawable]["package"] = packnactiv[0];
        data[drawable]["activity"] = packnactiv[1];
    }
    else {
        data[drawable] = {
            "package": packnactiv[0],
            "activity": packnactiv[1],
            "category": "None",
            "title": "Unknown"
        };
    }
}
<<<<<<<< HEAD:back-end/XmlDataExtractor.ts

function getComment(line: string): string {
    let comment;
    try { comment = line.match(/<!--(.+?)-->/)[1].trim(); } catch { comment = "Unknown" }
========
function getComment(line) {
    let comment;
    try {
        comment = line.match(/<!--(.+?)-->/)[1].trim();
    }
    catch (_a) {
        comment = "Unknown";
    }
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:back-end/xmlDataExtractor.js
    return comment;
}
module.exports = { ByProjectPath };
