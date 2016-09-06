import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Home } from './components/home';
import { Photos } from './components/photos';
import { Albums } from './components/albums';
import { AlbumPhotos } from './components/albumPhotos';
import { accountRoutes, accountRouting } from './components/account/routes';


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'photos',
        component: Photos
    },
    {
        path: 'albums',
        component: Albums
    },
    {
        path: 'albums/:id/photos',
        component: AlbumPhotos
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

//const appRoutes: Routes = [
//    home: new Route({ path: '/', name: 'Home', component: Home }),
//    photos: new Route({ path: '/photos', name: 'Photos', component: Photos }),
//    albums: new Route({ path: '/albums', name: 'Albums', component: Albums }),
//    albumPhotos: new Route({ path: '/albums/:id/photos', name: 'AlbumPhotos', component: AlbumPhotos }),
//    account: new Route({ path: '/account/...', name: 'Account', component: Account })
//];

//export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);
