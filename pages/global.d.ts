interface RendererAPIStructure {
	addImagesListener(callback: Functions["void"]): void;
	/**
	 * Opens a project by id
	 * @param id Project's id
	 */
	openProject(id?: string | null): void;
	/**
	 * Opens the finished or the requested folder in an explorer window
	 * @param type "finished" or "requested"
	 */
	openFolder(type?: string | null): void;
	/**
	 * Imports a icon request
	 * @param callback Called when import is finished
	 */
	importRequest(callback: Functions["void"]): void;
	/**
	 * Loads the list of icons for selected type
	 * @param type "finished" or "requested"
	 */
	getIcons(type: string | undefined | null, callback: Functions["icons"]): void;
	/**
	 * Loads information about an icon
	 * @param id Icon's id
	 */
	getIcon(id: string | undefined | null, callback: Functions["icon"]): void;
	/**
	 * Saves the information about an icon
	 * @param id Icon's id
	 * @param imagechanged If the image has been changed. Note: The image must be located in the cache with the icon's id
	 * @param icon The icon's data
	 * @param type Seperated from data
	 * @param callback Called when successfully saved
	 */
	setIcon(
		id: string | undefined | null,
		imagechanged: boolean | undefined | null,
		icon: Icon | undefined | null,
		type: string | undefined | null,
		callback: Functions["void"]
	): void;
	setConfig(config: Configuration, callback: Functions["void"]): void;
	/**
	 * Lets user choose an image that then gets copied to the cache
	 * @param id Icon's id
	 * @param callback When image successfully saved
	 */
	chooseImagePath(id: string | undefined | null, callback: Functions["void"]): void;
	/**
	 * Gets current project id and title
	 *
	 * Note: Lets user choose a path if there's no project loaded yet
	 * @param callback project doesn't contain requested and finished
	 */
	getProjectInfo(callback: Functions["projectInfo"]): void;
	/**
	 * Loads a file
	 *
	 * @param path Absolute path or relative path from /EasyCandyBar/
	 */
	GET(path: string | undefined | null, callback: Functions["GETResponse"]): void;
}
declare const RendererAPI: RendererAPIStructure;
