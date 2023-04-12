/**
 * Structure for an Icon
 */
class Icon {
    title: string;
    description: string;
    category: string;
    package: string;
    activity: string;
    constructor(icon: FragmentedIcon) {
        this.title = icon.title ? icon.title : "Unknown";
        this.description = icon.description ? icon.description : "";
        this.category = icon.category ? icon.category : "Unknown";
        this.package = icon.package ? icon.package : "Unknown";
        this.activity = icon.activity ? icon.activity : "Unknown";
    }
}