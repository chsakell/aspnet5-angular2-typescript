import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Router, RouterLink} from 'angular2/router';
import { Routes, APP_ROUTES } from './routes';
import { User } from '../../core/domain/user';
import { OperationResult } from '../../core/domain/operationResult';
import { MembershipService } from '../../core/services/membershipService';
import { NotificationService } from '../../core/services/notificationService';

@Component({
    selector: 'albums',
    providers: [MembershipService, NotificationService],
    templateUrl: './app/components/account/login.html',
    bindings: [MembershipService, NotificationService],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, RouterLink]
})
export class Login {
    private routes = Routes;
    private _router: Router;
    private _user: User;

    constructor(public membershipService: MembershipService,
                public notificationService: NotificationService,
                router: Router) {
        this._user = new User('', '');
        this.routes = Routes;
        this._router = router;
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
                    this._router.navigate([this.routes.home.name]);
                }
                else {
                    this.notificationService.printErrorMessage(_authenticationResult.Message);
                }
            });
    };
}