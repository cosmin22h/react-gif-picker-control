export class Gif {
    public id: string;
    public description: string;
    public urlPreview: string;
    public urlMedia: string;
    public width: number;
    public height: number;
    public createdAt: Date;

    constructor(
        id: string,
        description: string,
        urlPreview: string,
        urlMedia: string,
        width: number,
        height: number,
        createdAtTimestampUnix: number
    ) {
        this.id = id;
        this.description = description;
        this.urlPreview = urlPreview;
        this.urlMedia = urlMedia;
        this.width = width;
        this.height = height;
        this.createdAt = new Date(createdAtTimestampUnix * 1000);
    }
}
