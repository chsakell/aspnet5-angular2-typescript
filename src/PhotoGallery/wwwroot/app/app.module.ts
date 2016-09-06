import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Headers, RequestOptions, BaseRequestOptions} from '@angular/http';

import { AccountModule } from './components/account/account.module';
import { AppComponent }  from './app.component';
import { AlbumPhotosComponent } from './components/album-photos.component';
import { HomeComponent } from './components/home.component';
import { PhotosComponent } from './components/photos.component';
import { AlbumsComponent } from './components/albums.component';
import { routing } from './routes';

import { DataService } from './core/services/dataService';
import { MembershipService } from './core/services/membershipService';
import { UtilityService } from './core/services/utilityService';
import { NotificationService } from './core/services/notificationService';

class AppBaseRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers();

    constructor() {
        super();
        this.headers.append('Content-Type', 'application/json');
        this.body = '';
    }
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        AccountModule
    ],
    declarations: [AppComponent, AlbumPhotosComponent, HomeComponent, PhotosComponent, AlbumsComponent],
    providers: [DataService, MembershipService, UtilityService, NotificationService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: RequestOptions, useClass: AppBaseRequestOptions }],
    bootstrap: [AppComponent]
})
export class AppModule { }

