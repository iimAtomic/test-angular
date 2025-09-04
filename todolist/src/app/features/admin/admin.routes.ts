// src/app/features/admin/admin.routes.ts
import { Routes } from '@angular/router';

// The import needs to point to your existing file and the component it exports
import { AdminComponent } from './components/admin.components';
import { adminGuard } from '../../core/guards/admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [adminGuard],
  },
];
