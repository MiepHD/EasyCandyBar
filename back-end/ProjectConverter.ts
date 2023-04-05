import { XmlDataExtractor } from "./XmlDataExtractor";
/**
 * Converts a Candybar project or another icon-pack that has the same structure to an EasyCandyBar project
 */
class ProjectConverter {
    /**
     * Converts a Candybar project or another icon-pack that has the same structure to an EasyCandyBar project
     * @param path Path to the Project which contains the /app/
     */
    public convert(path: string): void {
        const fs: any = require("fs-extra");

        const data: any = new XmlDataExtractor().ByProjectPath(path),
            finished: Array<string> = Object.getOwnPropertyNames(data),
            id: string = this.extractFolderName(path);
        
        console.log("Copying images...");
        fs.copySync(`${path}/app/src/main/res/drawable-nodpi`, `projects/${id}/finished`);

        console.log("Copied images.\nGenerating icon's properties...");
        if (!fs.existsSync(`projects/${id}/properties/`)){ fs.mkdirSync(`projects/${id}/properties/`)}
        for (const key of Object.keys(data)) {
            fs.writeFileSync(`projects/${id}/properties/${key}.json`, JSON.stringify(data[key]));
        }

        console.log("Generated properties.\nCreating project's properties");
        fs.writeFileSync(`projects/${id}/project.json`, `{
            "id": "${id}",
            "title": "Unknown",
            "finished": ${JSON.stringify(finished)},
            "requested": []
        }`);
        fs.writeFileSync(`projects/${id}/config.json`, "{}");
        fs.writeFileSync(`projects/${id}/changelog.json`, "{}");
        console.log("Created project's properties.");
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

module.exports = new ProjectConverter().convert;