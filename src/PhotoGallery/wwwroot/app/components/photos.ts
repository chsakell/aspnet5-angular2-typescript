import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Router, RouterLink } from '@angular/router-deprecated'
import { Photo } from '../core/domain/photo';
import { Paginated } from '../core/common/paginated';
import { DataService } from '../core/services/dataService';

@Component({
    selector: 'photos',
    providers: [DataService],
    templateUrl: './app/components/photos.html',
    directives: [RouterLink]
})
export class Photos extends Paginated implements OnInit {
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
        this.photosService.get(this._page)
            .subscribe(res => {

                var data: any = res.json();

                this._photos = data.Items;
                this._page = data.Page;
                this._pagesCount = data.TotalPages;
                this._totalCount = data.TotalCount;
            },
            error => console.error('Error: ' + error));
    }

    search(i): void {
        super.search(i);
        this.getPhotos();
    };
}