class FileHandler {
    project: string;
    fs: any;
    constructor(project: string) {
        this.project = project; //The id of the project that belongs to this handler
        this.fs = require("fs");
    }
    saveIconProperties(id: string, data: Icon) {
        this.write(`projects/${this.project}/properties/${id}.json`, data);
    }
    loadIconProperties(id: string) {
        return this.read(`projects/${this.project}/properties/${id}.json`);
    }
    moveImage (id: string, type: string) {
        if (!(this.fs.existsSync(`projects/${this.project}/${type}/${id}.png`))) {
            if (!(this.fs.existsSync(`projects/${this.project}/${type}`))) fs.mkdirSync(`projects/${this.project}/${type}`);
            this.fs.copyFileSync(`projects/${this.project}/${this.switchType(type)}/${id}.png`, `projects/${this.project}/${type}/${id}.png`);
            this.fs.unlink(`projects/${this.project}/${this.switchType(type)}/${id}.png`, (err: Error | undefined) => {
                if (err) throw err;
                console.log("Successfully moved file");
            });
        }
    }
    switchType(type: string): string {
        switch (type) {
            case "finished":
                return "requested";
            default:
            case "requested":
                return "finished";
        }
    }
    read(path: string) {
        return JSON.parse(this.fs.readFileSync(path, { encoding: "utf8" }));
    }
    write(path: string, data: any) {
        this.fs.writeFileSync(path, JSON.stringify(data));
    }
}

module.exports = FileHandler;