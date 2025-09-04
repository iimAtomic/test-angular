import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/components/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/todos',
    pathMatch: 'full',
  },
  { path: 'auth/register', component: RegisterComponent },

  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: 'todos',
    loadChildren: () => import('./features/todos/todos.routes').then(m => m.TODOS_ROUTES),
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },
];
