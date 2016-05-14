import {Component} from '@angular/core'
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common'
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_BINDINGS} from '@angular/router-deprecated';
import { Routes, APP_ROUTES } from './routes';

@Component({
    selector: 'account',
    templateUrl: './app/components/account/account.html',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
@RouteConfig(APP_ROUTES)
export class Account {
    constructor() {

    }
}