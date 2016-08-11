import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import {HTTP_BINDINGS, HTTP_PROVIDERS, Headers, RequestOptions, BaseRequestOptions} from '@angular/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, ROUTER_BINDINGS } from '@angular/router-deprecated';

import { AppRoot }  from './app';

import { DataService } from './core/services/dataService';
import { MembershipService } from './core/services/membershipService';
import { UtilityService } from './core/services/utilityService';

class AppBaseRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers();

    constructor() {
        super();
        this.headers.append('Content-Type', 'application/json');
        this.body = '';
    }
}

@NgModule({
    imports: [BrowserModule, HttpModule],
    declarations: [AppRoot],
    providers: [DataService, MembershipService, UtilityService, ROUTER_PROVIDERS,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: RequestOptions, useClass: AppBaseRequestOptions }],
    bootstrap: [AppRoot]
})
export class AppModule { }

