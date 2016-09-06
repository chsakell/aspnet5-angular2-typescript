import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';

import { DataService } from '../../core/services/dataService';
import { MembershipService } from '../../core/services/membershipService';
import { NotificationService } from '../../core/services/notificationService';

import { AccountComponent } from './account.component';
import { LoginComponent } from './login.component';
import { RegisterComponent }   from './register.component';

import { accountRouting } from './routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        accountRouting
    ],
    declarations: [
        AccountComponent,
        LoginComponent,
        RegisterComponent
    ],

    providers: [
        DataService,
        MembershipService,
        NotificationService
    ]
})
export class AccountModule { }