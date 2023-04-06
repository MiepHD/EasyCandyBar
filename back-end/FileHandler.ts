export class FileHandler {
    protected readonly fs: any;
    constructor() {
        this.fs = require("fs");
    }
    public read(path: string): string {
        return this.fs.readFileSync(path, { encoding: "utf8" });
    }
    public write(path: string, data: any): void {
        this.fs.writeFileSync(path, JSON.stringify(data));
    }
}