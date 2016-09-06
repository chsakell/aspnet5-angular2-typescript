import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/domain/user';
import { OperationResult } from '../../core/domain/operationResult';
import { MembershipService } from '../../core/services/membershipService';
import { NotificationService } from '../../core/services/notificationService';

@Component({
    selector: 'albums',
    templateUrl: './app/components/account/login.component.html'
})
export class LoginComponent implements OnInit {
    private _user: User;

    constructor(public membershipService: MembershipService,
                public notificationService: NotificationService,
                public router: Router) { }

    ngOnInit() {
        this._user = new User('', '');
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
                    this.router.navigate(['home']);
                }
                else {
                    this.notificationService.printErrorMessage(_authenticationResult.Message);
                }
            });
    };
}