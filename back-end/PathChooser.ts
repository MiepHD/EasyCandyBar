/**
 * Opens a Dialog to select a file or folder
 */
export class PathChooser {
    private readonly dialog: any;
    private readonly BrowserWindow: any;
    public constructor() {
        this.dialog = require("electron").dialog;
        this.BrowserWindow = require("electron").BrowserWindow;
    }
    /**
     * The template for a open-dialog
     * @returns Path
     */
    private async template(type: string, title: string, ext: string): Promise<string> {
        return this.dialog.showOpenDialog( this.BrowserWindow.getFocusedWindow(), {
            properties: [type],
            filters: [{
                name: title,
                extensions: [ext]
            }]
        }).then((r: any) => { return r.filePaths[0]});
    }

    /**
     * Path is chosen by user
     * @returns Path to a directory
     */
    public async dir(): Promise<string> { return this.template("openDirectory", "Project or other icon pack folder", "*")}

    /**
     * Path is chosen by user
     * @returns Path to an image
     */
    public async image(): Promise<string> { return this.template("openFile", "Images", "png")}
    
    /**
     * Path is chosen by user
     * @returns Path to an icon request
     */
    public async zip(): Promise<string> { return this.template("openFile", "Icon Request", "zip")}
}