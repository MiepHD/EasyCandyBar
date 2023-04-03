class Project {
    constructor(id) {
        this.id = id;
        const FileHandler = require("./FileHandler");
        this.fs = new FileHandler(id);
        const data = this.fs.read(`projects/${id}/project.json`);
        this.finished = data.finished;
        this.requested = data.requested;
        this.title = data.title;
    }
    getFinishedIcons() {
        return this.finished;
    }
    getRequestedIcons() {
        return this.requested;
    }
    saveIconProperties(id, icon) {
        this.finished.push(id);
        this.fs.write(`projects/${this.id}/project.json`, {
            "id": this.id,
            "title": this.title,
            "finished": this.finished,
            "requested": this.requested
        });
        this.fs.saveIconProperties(id, icon);
    }
    getConfig() {
        this.fs.read(`projects/${this.id}/config.json`);
    }
    setConfig(data) {

    }
    getChangelog() {
        this.fs.read(`projects/${this.id}/changelog.json`);
    }
    setChangelog(data) {

    }
}

module.exports = Project;