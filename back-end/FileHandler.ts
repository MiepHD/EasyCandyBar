export class FileHandler {
    protected readonly fs: any;
    private readonly path: any;
    private readonly child_process: any;
    private readonly StreamZip: any;
    constructor() {
        this.fs = require("fs");
        this.child_process = require("child_process");
        this.path = require("path");
        this.StreamZip = require("node-stream-zip");
    }
    public read(path: string): string {
        return this.fs.readFileSync(path, { encoding: "utf8" });
    }
    public write(path: string, data: any): void {
        this.fs.writeFileSync(path, JSON.stringify(data));
    }
    /**
     * Creates a new directory if it doesn't already exist
     */
    public async newDir(path: string): Promise<void> {
        if (!this.fs.existsSync(path)) await this.fs.mkdirSync(path);
    }
    public async deleteDir(path: string): Promise<void> {
        if (!this.fs.existsSync(path)) await this.fs.rmSync(path, { recursive: true, force: true });
    }
    public isProject(path: string): boolean {
        return !(this.fs.existsSync(`${path}/project.json`));
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
}