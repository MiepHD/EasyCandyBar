class FileHandler {
    constructor(project) {
        this.project = project;
        this.fs = require("fs");
    }
    saveIconProperties(id, data) {
        this.write(`projects/${this.project}/properties/${id}.json`, data);
    }
    loadIconProperties(id) {
        return this.read(`projects/${this.project}/properties/${id}.json`);
    }
    read(path) {
        return JSON.parse(this.fs.readFileSync(path, { encoding: "utf8" }));
    }
    write(path, data) {
        this.fs.writeFileSync(path, JSON.stringify(data));
    }
}

module.exports = FileHandler;