import { Injectable } from 'angular2/core';
//import { alertify } from '../../../../typings/alertify/alertify'

@Injectable()
export class NotificationService {
    //private _printer: alertify.IAlertifyStatic;
    private _notifier: any = alertify;
    constructor() {
    }

    printSuccessMessage(message: string) {
        
        this._notifier.success(message);
        //this._printer.success(message);
    }

    printErrorMessage(message: string) {
        this._notifier.error(message);
        //this._printer.error(message);
    }

    printConfirmationDialog(message: string, okCallback: () => any) {
        this._notifier.confirm(message, function (e) {
            if (e) {
                okCallback();
            } else {
            }
        });
    }
}