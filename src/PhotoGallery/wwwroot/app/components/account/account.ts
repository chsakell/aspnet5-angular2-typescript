import {Component} from 'angular2/core'
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common'
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_BINDINGS} from 'angular2/router';
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