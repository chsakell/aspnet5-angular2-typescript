import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { Photo } from '../core/domain/photo';
import { Paginated } from '../core/common/paginated';
import { DataService } from '../core/services/dataService';
import { UtilityService } from '../core/services/utilityService';
import { NotificationService } from '../core/services/notificationService';
import { OperationResult } from '../core/domain/operationResult';
import { Subscription }  from 'rxjs/Subscription';

@Component({
    selector: 'album-photo',
    providers: [NotificationService],
    templateUrl: './app/components/album-photos.component.html'
})
export class AlbumPhotosComponent extends Paginated implements OnInit {
    private _albumsAPI: string = 'api/albums/';
    private _photosAPI: string = 'api/photos/';
    private _albumId: string;
    private _photos: Array<Photo>;
    private _displayingTotal: number;
    private _albumTitle: string;
    private sub: Subscription;

    constructor(public dataService: DataService,
                public utilityService: UtilityService,
                public notificationService: NotificationService,
                private route: ActivatedRoute,
                private router: Router) {
                super(0, 0, 0);
    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this._albumId = params['id']; // (+) converts string 'id' to a number
            this._albumsAPI += this._albumId + '/photos/';
            this.dataService.set(this._albumsAPI, 12);
            this.getAlbumPhotos();
        });
    }

    getAlbumPhotos(): void {
        this.dataService.get(this._page)
            .subscribe(res => {

                var data: any = res.json();

                this._photos = data.Items;
                this._displayingTotal = this._photos.length;
                this._page = data.Page;
                this._pagesCount = data.TotalPages;
                this._totalCount = data.TotalCount;
                this._albumTitle = this._photos[0].AlbumTitle;
            },
            error => {

                if (error.status == 401 || error.status == 302) {
                    this.utilityService.navigateToSignIn();
                }

                console.error('Error: ' + error)
            },
            () => console.log(this._photos));
    }

    search(i): void {
        super.search(i);
        this.getAlbumPhotos();
    };

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }

    delete(photo: Photo) {
        var _removeResult: OperationResult = new OperationResult(false, '');

        this.notificationService.printConfirmationDialog('Are you sure you want to delete the photo?',
            () => {
                this.dataService.deleteResource(this._photosAPI + photo.Id)
                    .subscribe(res => {
                        _removeResult.Succeeded = res.Succeeded;
                        _removeResult.Message = res.Message;
                    },
                    error => console.error('Error: ' + error),
                    () => {
                        if (_removeResult.Succeeded) {
                            this.notificationService.printSuccessMessage(photo.Title + ' removed from gallery.');
                            this.getAlbumPhotos();
                        }
                        else {
                            this.notificationService.printErrorMessage('Failed to remove photo');
                        }
                    });
            });
    }
}