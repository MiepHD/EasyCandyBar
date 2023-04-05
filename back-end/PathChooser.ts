/**
 * Constant variables for this file
 * It is marked as duplicated declaration 'cause Typescript doesn't understand that these are different files and it has to be declared again
 * Maybe there's a fix for that
**/
/**
 * Opens a Dialog to select a file or folder
 */
export class PathChooser {
    dialog: any;
    BrowserWindow: any;
    constructor() {
        this.dialog = require("electron").dialog;
        this.BrowserWindow = require("electron").BrowserWindow;
    }
    /**
     * The template for a open-dialog
     * 
     * @returns Path
     */
    private template(type: string, title: string, ext: string): Promise<string> {
        return this.dialog.showOpenDialog( this.BrowserWindow.getFocusedWindow(), {
            properties: [type],
            filters: [{
                name: title,
                extensions: [ext]
            }]
        }).then((r: any) => { return r.filePaths[0]});
    }

    /**
     * 
     * @returns Path to a directory
     */
    public dir(): Promise<string> { return this.template("openDirectory", "Project or other icon pack folder", "*")}

    /**
     * 
     * @returns Path to an image
     */
    public image(): Promise<string> { return this.template("openFile", "Images", "png")}
}