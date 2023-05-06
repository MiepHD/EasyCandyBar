import { BaseFileHandler } from "./BaseFileHandler";

export class FileHandler extends BaseFileHandler {
	private readonly path: any;
	private readonly child_process: any;
	private readonly StreamZip: any;
	constructor() {
		super();
		this.child_process = require("child_process");
		this.path = require("path");
		this.StreamZip = require("node-stream-zip");
	}
	public async deleteDir(path: string): Promise<void> {
		if (!this.fs.existsSync(path))
			await this.fs.rmSync(path, {
				recursive: true,
				force: true
			});
	}
	public getProjectType(path: string): string {
		if (this.fs.existsSync(`${path}/project.json`)) return "project";
		if (
			this.fs.existsSync(`${path}/app/src/main/res/drawable-nodpi`) &&
			this.fs.existsSync(`${path}/app/src/main/res/xml/`)
		)
			return "pack";
		return "none";
	}
	/**
	 * Opens a folder in the explorer
	 */
	public openFolder(path: string): void {
		this.child_process.exec(`explorer "${process.cwd()}\\${this.path.normalize(path)}"`);
	}
	public async extractZip(path: string): Promise<void> {
		const zip = new this.StreamZip.async({ file: path });
		this.newDir("cache/extracted");
		await zip.extract(null, "./cache/extracted");
		await zip.close();
	}
	public async copyFile(origin: string, dest: string): Promise<void> {
		await this.fs.copyFileSync(origin, dest);
	}
	/**
	 * Extracts folder from path to folder
	 * @param path Path to a folder
	 * @returns Folder
	 */
	public extractFolderName(path: string): string {
		const folders: Array<string> = path.split("/").length > 1 ? path.split("/") : path.split("\\");
		return folders[folders.length - 1];
	}
}
