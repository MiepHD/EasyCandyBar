export class BaseFileHandler {
    protected readonly fs: any;
    constructor() {
        this.fs = require("fs");
    }
    /**
     * Creates a new directory if it doesn't already exist
     */
    public async newDir(path: string): Promise<void> {
        if (!this.fs.existsSync(path)) await this.fs.mkdirSync(path);
    }
    public read(path: string): string {
        return this.fs.readFileSync(path, { encoding: "utf8" });
    }
    public write(path: string, data: any): void {
        this.fs.writeFileSync(path, JSON.stringify(data));
    }
}