import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class UtilityService {

    private _router: Router;

    constructor(router: Router) {
        this._router = router;
    }

    convertDateTime(date: Date) {
        var _formattedDate = new Date(date.toString());
        return _formattedDate.toDateString();
    }

    navigate(path: string) {
        this._router.navigate([path]);
    }

    navigateToSignIn() {
        this.navigate('/account/login');
    }
}