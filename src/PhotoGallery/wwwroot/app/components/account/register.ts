import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Router} from 'angular2/router'
import { Routes, APP_ROUTES } from './routes';
import { Registration } from '../../core/domain/registration'
import { OperationResult } from '../../core/domain/operationResult'
import { MembershipService } from '../../core/services/membershipService';
import { NotificationService } from '../../core/services/notificationService';

@Component({
    selector: 'register',
    providers: [MembershipService, NotificationService],
    templateUrl: './app/components/account/register.html',
    bindings: [MembershipService, NotificationService],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class Register {

    private routes = Routes;
    private _router: Router;
    private _newUser: Registration;

    constructor(public membershipService: MembershipService,
                public notificationService: NotificationService,
                router: Router) {
        this._newUser = new Registration('', '', '');
        this._router = router;
        this.routes = Routes;
    }

    register(): void {
        var _registrationResult: OperationResult = new OperationResult(false, '');
        this.membershipService.register(this._newUser)
            .subscribe(res => {
                _registrationResult.Succeeded = res.Succeeded;
                _registrationResult.Message = res.Message;

            },
            error => console.error('Error: ' + error),
            () => {
                if (_registrationResult.Succeeded) {
                    this.notificationService.printSuccessMessage('Dear ' + this._newUser.Username + ', please login with your credentials');
                    this._router.navigate([this.routes.login.name]);
                }
                else {
                    this.notificationService.printErrorMessage(_registrationResult.Message);
                }
            });
    };
}