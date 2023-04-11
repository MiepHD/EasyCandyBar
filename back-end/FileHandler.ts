export class FileHandler {
    protected readonly fs: any;
    private readonly path: any;
    private readonly child_process: any;
    constructor() {
        this.fs = require("fs");
        this.child_process = require("child_process");
        this.path = require("path");
    }
    public read(path: string): string {
        return this.fs.readFileSync(path, { encoding: "utf8" });
    }
    public write(path: string, data: any): void {
        this.fs.writeFileSync(path, JSON.stringify(data));
    }
    /**
     * Opens a folder in the explorer
     */
    public openFolder(path: string): void {
        this.child_process.exec(`explorer "${process.cwd()}\\${this.path.normalize(path)}"`);
    }
}