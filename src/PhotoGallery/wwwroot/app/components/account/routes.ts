import { Route, Router } from '@angular/router-deprecated';
import { Login } from './login';
import { Register } from './register';
import { Home } from '../../components/home';

export var Routes = {
    login: new Route({ path: '/', name: 'Login', component: Login }),
    register: new Route({ path: '/register', name: 'Register', component: Register }),
    home: new Route({ path: '/home', name: 'Home', component: Home })
};

export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);
