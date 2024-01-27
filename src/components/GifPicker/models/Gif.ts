export class Gif {
    public id: string;
    public description: string;
    public urlMedia: string;

    constructor(id: string, description: string, urlMedia: string) {
        this.id = id;
        this.description = description;
        this.urlMedia = urlMedia;
    }
}
