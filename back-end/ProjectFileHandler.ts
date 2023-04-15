import { BaseFileHandler } from "./BaseFileHandler";

/**
 * Handles the files associated with this project
 */
export class ProjectFileHandler extends BaseFileHandler {
    /**
     * Id of the project it is associated with
     */
    private readonly project: string;
    public constructor(project: string) {
        super();
        this.project = project; //The id of the project that belongs to this handler
    }
    /**
     * Saves icon data to corresponding file
     */
    public saveIconProperties(id: string, data: Icon): void {
        this.write(`projects/${this.project}/properties/${id}.json`, data);
    }
    /**
     * Reads icon's data from file
     */
    public loadIconProperties(id: string): Icon {
        return this.read(`projects/${this.project}/properties/${id}.json`);
    }
    /**
     * Moves image of icon to another folder
     * @param type "requested" | "finished"
     */
    public moveImage (id: string, type: string): void {
        if (!(this.fs.existsSync(`projects/${this.project}/${type}/${id}.png`))) {
            this.newDir(`projects/${this.project}/${type}`).then(() => {
                this.fs.copyFileSync(`projects/${this.project}/${this.switchType(type)}/${id}.png`, `projects/${this.project}/${type}/${id}.png`);
                this.fs.unlink(`projects/${this.project}/${this.switchType(type)}/${id}.png`, (err: Error | undefined) => {
                    if (err) throw err;
                    console.log("Successfully moved file");
                });
            });
        }
    }
    /**
     * Defaults to "finished" as output if type isn't valid
     * @param type "requested" | "finished"
     * @returns Corresponding other one
     */
    private switchType(type: string): string {
        switch (type) {
            case "finished":
                return "requested";
            default:
            case "requested":
                return "finished";
        }
    }
    /**
     * Reads a file that contains JSON
     * @returns The content as an object
     * @override
     */
    public read(path: string): any {
        return JSON.parse(super.read(path));
    }
}