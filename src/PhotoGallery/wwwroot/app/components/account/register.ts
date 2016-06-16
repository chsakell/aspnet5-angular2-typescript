import { Component, OnInit} from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated'
import { Routes, APP_ROUTES } from './routes';
import { Registration } from '../../core/domain/registration'
import { OperationResult } from '../../core/domain/operationResult'
import { MembershipService } from '../../core/services/membershipService';
import { NotificationService } from '../../core/services/notificationService';

@Component({
    selector: 'register',
    providers: [MembershipService, NotificationService],
    templateUrl: './app/components/account/register.html',
    directives: [ROUTER_DIRECTIVES]
})
export class Register implements OnInit {

    private routes = Routes;
    private _newUser: Registration;

    constructor(public membershipService: MembershipService,
                public notificationService: NotificationService,
                public router: Router) { }

    ngOnInit() {
        this._newUser = new Registration('', '', '');
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
                    this.router.navigate([this.routes.login.name]);
                }
                else {
                    this.notificationService.printErrorMessage(_registrationResult.Message);
                }
            });
    };
}