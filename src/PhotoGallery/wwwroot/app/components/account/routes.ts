import { Route, Router } from 'angular2/router';
import { Login } from './Login';
import { Register } from './Register';
import { Home } from '../../components/Home';

export var Routes = {
    login: new Route({ path: '/', name: 'Login', component: Login }),
    register: new Route({ path: '/register', name: 'Register', component: Register }),
    home: new Route({ path: '/home', name: 'Home', component: Home })
};

export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);
