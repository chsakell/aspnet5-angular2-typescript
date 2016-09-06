import { Component, OnInit } from '@angular/core';
import { Photo } from '../core/domain/photo';
import { Paginated } from '../core/common/paginated';
import { DataService } from '../core/services/dataService';

@Component({
    selector: 'photos',
    templateUrl: './app/components/photos.component.html'
})
export class PhotosComponent extends Paginated implements OnInit {
    private _photosAPI: string = 'api/photos/';
    private _photos: Array<Photo>;

    constructor(public photosService: DataService) {
        super(0, 0, 0);
    }

    ngOnInit() {
        this.photosService.set(this._photosAPI, 12);
        this.getPhotos();
    }

    getPhotos(): void {
        let self = this;
        self.photosService.get(self._page)
            .subscribe(res => {

                var data: any = res.json();

                self._photos = data.Items;
                self._page = data.Page;
                self._pagesCount = data.TotalPages;
                self._totalCount = data.TotalCount;
            },
            error => console.error('Error: ' + error));
    }

    search(i): void {
        super.search(i);
        this.getPhotos();
    };
}