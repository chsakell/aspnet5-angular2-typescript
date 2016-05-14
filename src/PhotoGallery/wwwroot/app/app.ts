///<reference path="../../typings/browser.d.ts" />

import {provide, Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_BINDINGS, HTTP_PROVIDERS, Headers, RequestOptions, BaseRequestOptions} from '@angular/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, ROUTER_BINDINGS } from '@angular/router-deprecated';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import 'rxjs/add/operator/map';
import {enableProdMode} from '@angular/core';
import 'rxjs/Rx';   // Load all features

enableProdMode();
import { Routes, APP_ROUTES } from './routes';

import { DataService } from './core/services/dataService';
import { MembershipService } from './core/services/membershipService';
import { UtilityService } from './core/services/utilityService';
import { User } from './core/domain/user';

@Component({
    selector: 'photogallery-app',
    templateUrl: './app/app.html',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES]
})
@RouteConfig(APP_ROUTES)
export class AppRoot {
    private routes = Routes;

    constructor(public membershipService: MembershipService, location: Location) {
        this.routes = Routes;
        location.go('/');
    }

    isUserLoggedIn(): boolean {
        return this.membershipService.isUserAuthenticated();
    }

    getUserName(): string {
        if (this.isUserLoggedIn()) {
            var _user = this.membershipService.getLoggedInUser();
            return _user.Username;
        }
        else
            return 'Account';
    }

    logout(): void {
        this.membershipService.logout()
            .subscribe(res => {
                localStorage.removeItem('user');
            },
            error => console.error('Error: ' + error),
            () => { });
    }
}

class AppBaseRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers({
        'Content-Type': 'application/json'
    })
}

bootstrap(AppRoot, [HTTP_PROVIDERS, ROUTER_PROVIDERS,
    provide(RequestOptions, { useClass: AppBaseRequestOptions }),
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    DataService, MembershipService, UtilityService])
    .catch(err => console.error(err));

// ROUTER_BINDINGS: DO NOT USE HERE IF YOU WANT TO HAVE HASHLOCATIONSTRATEGY!!