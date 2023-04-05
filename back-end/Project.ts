/**
 * It is marked as duplicated declaration 'cause Typescript doesn't understand that these are different files and it has to be declared again
 * Maybe there's a fix for that
**/
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
    setIconCategory(id: string, type: string) {
        this.fs.moveImage(id, type);
        let target: Array<string>;
        let origin: Array<string>;
        switch (type) {
            default:
            case "finished":
                target = this.finished;
                origin = this.requested;
                break;
            case "requested":
                target = this.requested;
                origin = this.finished;
                break;
        }
        if (!(id in target)) target.push(id);
        const i: number = origin.indexOf(id);
        if (i > -1) origin.splice(i, 1);
        this.saveProjectData();
    }
    saveIconProperties(id: string, icon: any): void {
        this.saveProjectData();
        this.fs.saveIconProperties(id, icon);
    }
    getConfig(): any {
        return JSON.parse(this.fs.read(`projects/${this.id}/config.json`));
    }
    setConfig(data: any): void {

    }
    getChangelog(): any {
        return JSON.parse(this.fs.read(`projects/${this.id}/changelog.json`));
    }
    setChangelog(data: any): void {

    }
    saveProjectData() {
        this.fs.write(`projects/${this.id}/project.json`, {
            "id": this.id,
            "title": this.title,
            "finished": this.finished,
            "requested": this.requested
        });
    }
}

module.exports = Project;