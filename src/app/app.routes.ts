import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Home } from './features/dashboard/pages/home';

export const routes: Routes = [
    {
    path:"",
    component:Home,
    canActivate:[authGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-module').then((m) => m.AuthModule),
  },
];
