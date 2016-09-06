import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Account } from './account';
import { Login } from './login';
import { Register } from './register';
import { Home } from '../../components/home';


export const accountRoutes: Routes = [
    {
        path: 'account',
        component: Account,
        children: [
            { path: 'register', component: Register },
            { path: 'login', component: Login }
        ]
    }
];

export const accountRouting: ModuleWithProviders = RouterModule.forChild(accountRoutes);