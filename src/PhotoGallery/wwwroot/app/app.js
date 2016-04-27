///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
System.register(['angular2/core', 'angular2/common', 'angular2/platform/browser', 'angular2/http', 'angular2/router', 'rxjs/add/operator/map', './routes', './core/services/dataService', './core/services/membershipService', './core/services/utilityService'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var core_1, common_1, browser_1, http_1, router_1, core_2, routes_1, dataService_1, membershipService_1, utilityService_1;
    var AppRoot, AppBaseRequestOptions;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {},
            function (routes_1_1) {
                routes_1 = routes_1_1;
            },
            function (dataService_1_1) {
                dataService_1 = dataService_1_1;
            },
            function (membershipService_1_1) {
                membershipService_1 = membershipService_1_1;
            },
            function (utilityService_1_1) {
                utilityService_1 = utilityService_1_1;
            }],
        execute: function() {
            core_2.enableProdMode();
            AppRoot = (function () {
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
                        directives: [router_1.ROUTER_DIRECTIVES, common_1.CORE_DIRECTIVES]
                    }),
                    router_1.RouteConfig(routes_1.APP_ROUTES), 
                    __metadata('design:paramtypes', [membershipService_1.MembershipService, router_1.Location])
                ], AppRoot);
                return AppRoot;
            }());
            exports_1("AppRoot", AppRoot);
            AppBaseRequestOptions = (function (_super) {
                __extends(AppBaseRequestOptions, _super);
                function AppBaseRequestOptions() {
                    _super.apply(this, arguments);
                    this.headers = new http_1.Headers({
                        'Content-Type': 'application/json'
                    });
                }
                return AppBaseRequestOptions;
            }(http_1.BaseRequestOptions));
            browser_1.bootstrap(AppRoot, [http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS,
                core_1.provide(http_1.RequestOptions, { useClass: AppBaseRequestOptions }),
                core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
                dataService_1.DataService, membershipService_1.MembershipService, utilityService_1.UtilityService])
                .catch(function (err) { return console.error(err); });
        }
    }
});
// ROUTER_BINDINGS: DO NOT USE HERE IF YOU WANT TO HAVE HASHLOCATIONSTRATEGY!! 
//# sourceMappingURL=app.js.map