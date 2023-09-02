export class Gif {
    public id: string;
    public description: string;
    public urlMedia: string;
    // dim: ?

    constructor(id: string, description: string, urlMedia: string) {
        this.id = id;
        this.description = description;
        this.urlMedia = urlMedia;
    }
}
