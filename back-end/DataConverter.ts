import { FileHandler } from "./FileHandler";
import { XmlDataExtractor } from "./XmlDataExtractor";
/**
 * Converts a Candybar project or another icon-pack that has the same structure to an EasyCandyBar project
 */
export class DataConverter {
    private readonly extra: any;
    private fs: FileHandler;
    public constructor() {
        this.extra = require("fs-extra");
        this.fs = new FileHandler();
    }
    /**
     * Converts a Candybar project or another icon-pack that has the same structure to an EasyCandyBar project
     * @param path Path to the Project which contains the /app/
     * @param callback Called when images are copied
     */
    public project(path: string, callback: Functions["void"]): void {
        const data: any = new XmlDataExtractor().ByProjectPath(`${path}/app/src/main/res/xml/`),
            finished: Array<string> = Object.getOwnPropertyNames(data),
            id: string = this.fs.extractFolderName(path);
        
        this.fs.newDir(`projects/${id}/`);
        console.log("Copying images...");
        this.extra.copy(`${path}/app/src/main/res/drawable-nodpi`, `projects/${id}/finished`, () => {
            console.log("Copied images.");
            callback();
        });

        console.log("Generating icon's properties...");
        this.fs.newDir(`projects/${id}/properties/`);
        for (const key of Object.keys(data)) {
            this.fs.write(`projects/${id}/properties/${key}.json`, JSON.stringify(data[key]));
        }

        console.log("Generated properties.\nCreating project's properties");
        this.fs.write(`projects/${id}/project.json`, JSON.parse(`{
            "id": "${id}",
            "title": "Unknown",
            "finished": ${JSON.stringify(finished)},
            "requested": []
        }`));
        this.fs.write(`projects/${id}/config.json`, "{}");
        this.fs.write(`projects/${id}/changelog.json`, "{}");
        console.log("Created project's properties.");
    }
    /**
     * 
     * @param path Path to extracted request
     * @param id Project's id
     * @returns List of ids in request
     */
    public async request(path: string, id: string): Promise<any> {
        const data: any = new XmlDataExtractor().ByProjectPath(path);
        console.log("Copying images...");
        this.extra.copySync(path, `projects/${id}/requested`, { filter: (src: string) => { return src.endsWith(".png") || (!src.includes(".")); }});
        return data;
    }
}