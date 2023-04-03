"use strict";
class Project {
    id: string;
    fs: any;
    finished: Array<string>;
    requested: Array<string>;
    title: string;
    constructor(id: string) {
        this.id = id;
        const FileHandler = require("./FileHandler");
        this.fs = new FileHandler(id);
        const data = this.fs.read(`projects/${id}/project.json`);
        this.finished = data.finished;
        this.requested = data.requested;
        this.title = data.title;
    }
    getFinishedIcons(): Array<string> {
        return this.finished;
    }
    getRequestedIcons(): Array<string> {
        return this.requested;
    }
    saveIconProperties(id: string, icon: any): void {
        this.finished.push(id);
        this.fs.write(`projects/${this.id}/project.json`, {
            "id": this.id,
            "title": this.title,
            "finished": this.finished,
            "requested": this.requested
        });
        this.fs.saveIconProperties(id, icon);
    }
<<<<<<<< HEAD:back-end/Project.ts
    getConfig(): any {
        return JSON.parse(this.fs.read(`projects/${this.id}/config.json`));
    }
    setConfig(data: any): void {

    }
    getChangelog(): any {
        return JSON.parse(this.fs.read(`projects/${this.id}/changelog.json`));
    }
    setChangelog(data: any): void {

========
    getConfig() {
        return JSON.parse(this.fs.read(`projects/${this.id}/config.json`));
    }
    setConfig(data) {
    }
    getChangelog() {
        return JSON.parse(this.fs.read(`projects/${this.id}/changelog.json`));
    }
    setChangelog(data) {
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:back-end/Project.js
    }
}
module.exports = Project;
