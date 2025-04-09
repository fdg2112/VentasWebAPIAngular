import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'cliente',
        component: ClienteComponent
    }
];
