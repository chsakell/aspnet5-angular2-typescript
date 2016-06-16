import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Router, RouterLink } from '@angular/router-deprecated';
import { Routes, APP_ROUTES } from './routes';
import { User } from '../../core/domain/user';
import { OperationResult } from '../../core/domain/operationResult';
import { MembershipService } from '../../core/services/membershipService';
import { NotificationService } from '../../core/services/notificationService';

@Component({
    selector: 'albums',
    providers: [MembershipService, NotificationService],
    templateUrl: './app/components/account/login.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, RouterLink]
})
export class Login implements OnInit {
    private routes = Routes;
    private _user: User;

    constructor(public membershipService: MembershipService,
                public notificationService: NotificationService,
                public router: Router) { }

    ngOnInit() {
        this._user = new User('', '');
        this.routes = Routes;
    }

    login(): void {
        var _authenticationResult: OperationResult = new OperationResult(false, '');

        this.membershipService.login(this._user)
            .subscribe(res => {
                _authenticationResult.Succeeded = res.Succeeded;
                _authenticationResult.Message = res.Message;
            },
            error => console.error('Error: ' + error),
            () => {
                if (_authenticationResult.Succeeded) {
                    this.notificationService.printSuccessMessage('Welcome back ' + this._user.Username + '!');
                    localStorage.setItem('user', JSON.stringify(this._user));
                    this.router.navigate([this.routes.home.name]);
                }
                else {
                    this.notificationService.printErrorMessage(_authenticationResult.Message);
                }
            });
    };
}