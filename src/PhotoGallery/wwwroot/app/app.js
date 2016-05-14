///<reference path="../../typings/browser.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var router_deprecated_1 = require('@angular/router-deprecated');
var common_2 = require('@angular/common');
require('rxjs/add/operator/map');
var core_2 = require('@angular/core');
require('rxjs/Rx'); // Load all features
core_2.enableProdMode();
var routes_1 = require('./routes');
var dataService_1 = require('./core/services/dataService');
var membershipService_1 = require('./core/services/membershipService');
var utilityService_1 = require('./core/services/utilityService');
var AppRoot = (function () {
    function AppRoot(membershipService, location) {
        this.membershipService = membershipService;
        this.routes = routes_1.Routes;
        this.routes = routes_1.Routes;
        location.go('/');
    }
    AppRoot.prototype.isUserLoggedIn = function () {
        return this.membershipService.isUserAuthenticated();
    };
    AppRoot.prototype.getUserName = function () {
        if (this.isUserLoggedIn()) {
            var _user = this.membershipService.getLoggedInUser();
            return _user.Username;
        }
        else
            return 'Account';
    };
    AppRoot.prototype.logout = function () {
        this.membershipService.logout()
            .subscribe(function (res) {
            localStorage.removeItem('user');
        }, function (error) { return console.error('Error: ' + error); }, function () { });
    };
    AppRoot = __decorate([
        core_1.Component({
            selector: 'photogallery-app',
            templateUrl: './app/app.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }),
        router_deprecated_1.RouteConfig(routes_1.APP_ROUTES), 
        __metadata('design:paramtypes', [membershipService_1.MembershipService, common_2.Location])
    ], AppRoot);
    return AppRoot;
}());
exports.AppRoot = AppRoot;
var AppBaseRequestOptions = (function (_super) {
    __extends(AppBaseRequestOptions, _super);
    function AppBaseRequestOptions() {
        _super.apply(this, arguments);
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
    }
    return AppBaseRequestOptions;
}(http_1.BaseRequestOptions));
platform_browser_dynamic_1.bootstrap(AppRoot, [http_1.HTTP_PROVIDERS, router_deprecated_1.ROUTER_PROVIDERS,
    core_1.provide(http_1.RequestOptions, { useClass: AppBaseRequestOptions }),
    core_1.provide(common_2.LocationStrategy, { useClass: common_2.HashLocationStrategy }),
    dataService_1.DataService, membershipService_1.MembershipService, utilityService_1.UtilityService])
    .catch(function (err) { return console.error(err); });
// ROUTER_BINDINGS: DO NOT USE HERE IF YOU WANT TO HAVE HASHLOCATIONSTRATEGY!! 
//# sourceMappingURL=app.js.map