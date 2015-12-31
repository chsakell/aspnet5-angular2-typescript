export class Album {
    Id: number;
    Title: string;
    Description: string;
    Thumbnail: string;
    DateCreated: Date;
    TotalPhotos: number;

    constructor(id: number,
        title: string,
        description: string,
        thumbnail: string,
        dateCreated: Date,
        totalPhotos: number) {
        this.Id = id;
        this.Title = title;
        this.Description = description;
        this.Thumbnail = thumbnail;
        this.DateCreated = dateCreated;
        this.TotalPhotos = totalPhotos;
    }
}