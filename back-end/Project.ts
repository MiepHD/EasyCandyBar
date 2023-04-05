/**
 * It is marked as duplicated declaration 'cause Typescript doesn't understand that these are different files and it has to be declared again
 * Maybe there's a fix for that
**/
/**
 * Create an object of this class to open a project
 * 
 * @fs File Handler for the project
 * @finished Ids of finished icons associated with this project
 * @requested Ids of requested icons associated with this project
 */
export class Project {
    public id: string;
    public fs: FileHandler;
    private finished: Array<string>;
    private requested: Array<string>;
    public title: string;
    public constructor(id: string) {
        this.id = id;
        const FileHandler = require("./FileHandler");
        this.fs = new FileHandler(id);
        const data = this.fs.read(`projects/${id}/project.json`);
        this.finished = data.finished;
        this.requested = data.requested;
        this.title = data.title;
    }
    /**
     * Loads ids of finished icons from runtime
     * @returns ids of finished icons associated with this project
    **/
    public getFinishedIcons(): Array<string> {
        return this.finished;
    }
    /**
     * Loads ids of requested icons from runtime
     * @returns Ids of requested icons associated with this project
     */
    public getRequestedIcons(): Array<string> {
        return this.requested;
    }
    /**
     * Changes the category for an icon in runtime and then saves the state
     * @param type "requested" | "finished"
     */
    public setIconCategory(id: string, type: string): void {
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
    public getConfig(): any {
        return JSON.parse(this.fs.read(`projects/${this.id}/config.json`));
    }
    public setConfig(data: any): void {

    }
    public getChangelog(): any {
        return JSON.parse(this.fs.read(`projects/${this.id}/changelog.json`));
    }
    public setChangelog(data: any): void {

    }
    private saveProjectData(): void {
        this.fs.write(`projects/${this.id}/project.json`, {
            "id": this.id,
            "title": this.title,
            "finished": this.finished,
            "requested": this.requested
        });
    }
}