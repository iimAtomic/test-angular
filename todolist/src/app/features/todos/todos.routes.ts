import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list.component';
import { authGuard } from '../../core/guards/auth.guard';

export const TODOS_ROUTES: Routes = [
  {
    path: '',
    component: TodoListComponent,
    canActivate: [authGuard],
  },
];
