import { XmlDataExtractor } from "./XmlDataExtractor";
/**
 * Converts a Candybar project or another icon-pack that has the same structure to an EasyCandyBar project
 */
export class DataConverter {
    fs: any;
    public constructor() {
        this.fs = require("fs-extra");
    }
    /**
     * Converts a Candybar project or another icon-pack that has the same structure to an EasyCandyBar project
     * @param path Path to the Project which contains the /app/
     */
    public project(path: string): void {
        const data: any = new XmlDataExtractor().ByProjectPath(`${path}/app/src/main/res/xml/`),
            finished: Array<string> = Object.getOwnPropertyNames(data),
            id: string = this.extractFolderName(path);
        
        console.log("Copying images...");
        this.fs.copySync(`${path}/app/src/main/res/drawable-nodpi`, `projects/${id}/finished`);

        console.log("Copied images.\nGenerating icon's properties...");
        if (!this.fs.existsSync(`projects/${id}/properties/`)){ this.fs.mkdirSync(`projects/${id}/properties/`); }
        for (const key of Object.keys(data)) {
            this.fs.writeFileSync(`projects/${id}/properties/${key}.json`, JSON.stringify(data[key]));
        }

        console.log("Generated properties.\nCreating project's properties");
        this.fs.writeFileSync(`projects/${id}/project.json`, `{
            "id": "${id}",
            "title": "Unknown",
            "finished": ${JSON.stringify(finished)},
            "requested": []
        }`);
        this.fs.writeFileSync(`projects/${id}/config.json`, "{}");
        this.fs.writeFileSync(`projects/${id}/changelog.json`, "{}");
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
        this.fs.copySync(path, `projects/${id}/requested`, { filter: (src: string) => { return src.endsWith(".png") || (!src.includes(".")); }});
        return data;
    }
    /**
     * Extracts folder from path to folder
     * @param path Path to a folder
     * @returns Folder
     */
    private extractFolderName(path: string): string {
        const folders: Array<string> = path.split("\\");
        return folders[folders.length - 1];
    }
}