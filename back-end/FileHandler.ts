"use strict";
class FileHandler {
    project: string;
    fs: any;
    constructor(project: string) {
        this.project = project;
        this.fs = require("fs");
    }
    saveIconProperties(id: string, data: any) {
        this.write(`projects/${this.project}/properties/${id}.json`, data);
    }
    loadIconProperties(id: string) {
        return this.read(`projects/${this.project}/properties/${id}.json`);
    }
    read(path: string) {
        return JSON.parse(this.fs.readFileSync(path, { encoding: "utf8" }));
    }
    write(path: string, data: any) {
        this.fs.writeFileSync(path, JSON.stringify(data));
    }
}
module.exports = FileHandler;
