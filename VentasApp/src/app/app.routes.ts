import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]  
    },
    {
        path: 'cliente',
        component: ClienteComponent,
        canActivate: [AuthGuard]  
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
