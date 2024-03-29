import { ProjectFileHandler } from "./ProjectFileHandler";
import { Configuration } from "./Configuration";

/**
 * Create an object of this class to open a project
 *
 * @fs File Handler for the project
 * @finished Ids of finished icons associated with this project
 * @requested Ids of requested icons associated with this project
 */
export class Project {
	public readonly id: string;
	public title: string;
	public readonly fs: ProjectFileHandler;
	private finished: Array<string>;
	private requested: Array<string>;
	public constructor(id: string) {
		this.id = id;
		this.fs = new ProjectFileHandler(id);
		const data: ProjectStructure = this.fs.read(`projects/${id}/project.json`);
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
	 * Changes the category for an icon in runtime and then saves the state. If it is already in the right category it does nothing
	 * @param type "requested" | "finished"
	 */
	public setIconCategory(id: string, type: string): void {
		this.fs.moveImage(id, type);
		let target: Array<string>;
		let origin: Array<string>;
		switch (type) {
			default:
				throw "Invalid type";
			case "finished":
				target = this.finished;
				origin = this.requested;
				break;
			case "requested":
				target = this.requested;
				origin = this.finished;
				break;
		}
		if (!target.includes(id)) target.push(id);
		const i: number = origin.indexOf(id);
		if (i > -1) origin.splice(i, 1);
		this.saveProjectData();
	}
	/**
	 * Reads project's configuration from file
	 * @returns Configuration for project
	 */
	public getConfig(): Configuration {
		try {
			return JSON.parse(this.fs.read(`projects/${this.id}/config.json`));
		} catch {
			return new Configuration();
		}
	}
	public setConfig(data: Configuration): void {
		this.fs.write(`projects/${this.id}/config.json`, data);
	}
	public getChangelog(): any {
		return JSON.parse(this.fs.read(`projects/${this.id}/changelog.json`));
	}
	public setChangelog(data: any): void {}
	public saveIcon(id: string, data: FragmentedIcon): void {
		const icon: Icon = new Icon(data);
		this.fs.saveIconProperties(id, icon);
	}
	/**
	 * Saves current project data to project.json
	 */
	private saveProjectData(): void {
		this.fs.write(`projects/${this.id}/project.json`, {
			id: this.id,
			title: this.title,
			finished: this.finished,
			requested: this.requested
		});
	}
}
