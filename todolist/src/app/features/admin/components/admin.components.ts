// src/app/features/admin/components/admin.components.ts
import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { TodoService } from '../../todos/services/todo.service';
import { User } from '../../auth/models/user.model';
import { Todo } from '../../todos/models/todo.model';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, DragDropModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      @if (successMessage()) {
        <div class="mb-4 rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">{{ successMessage() }}</p>
            </div>
          </div>
        </div>
      }
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Interface d'Administration</h1>
        <p class="text-gray-600 mt-2">Gérez les utilisateurs et les tickets</p>
      </div>

      <div class="mb-8">
        <nav class="flex space-x-4">
          <button
            (click)="activeTab.set('users')"
            [class.bg-blue-600]="activeTab() === 'users'"
            [class.text-white]="activeTab() === 'users'"
            [class.text-gray-700]="activeTab() !== 'users'"
            class="px-4 py-2 rounded-md font-medium hover:bg-blue-700 hover:text-white transition-colors"
          >
            Utilisateurs
          </button>
          <button
            (click)="activeTab.set('tickets')"
            [class.bg-blue-600]="activeTab() === 'tickets'"
            [class.text-white]="activeTab() === 'tickets'"
            [class.text-gray-700]="activeTab() !== 'tickets'"
            class="px-4 py-2 rounded-md font-medium hover:bg-blue-700 hover:text-white transition-colors"
          >
            Tickets
          </button>
        </nav>
      </div>

      @if (activeTab() === 'users') {
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">Gestion des Utilisateurs</h2>
          </div>
          <div class="p-6">
            @if (users().length > 0) {
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Utilisateur
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Rôle
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    @for (user of users(); track user.id) {
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                              <div
                                class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center"
                              >
                                <span class="text-sm font-medium text-gray-700">
                                  {{ user.name.charAt(0).toUpperCase() }}
                                </span>
                              </div>
                            </div>
                            <div class="ml-4">
                              <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                              <div class="text-sm text-gray-500">{{ user.email }}</div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span
                            [class.bg-red-100]="user.role === 'admin'"
                            [class.text-red-800]="user.role === 'admin'"
                            [class.bg-green-100]="user.role === 'user'"
                            [class.text-green-800]="user.role === 'user'"
                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          >
                            {{ user.role | titlecase }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                          @if (user.role !== 'admin') {
                            <button
                              (click)="promoteToAdmin(user)"
                              class="text-blue-600 hover:text-blue-900"
                            >
                              Promouvoir Admin
                            </button>
                            <button
                              (click)="deleteUser(user.id)"
                              class="text-red-600 hover:text-red-900"
                            >
                              Supprimer
                            </button>
                          } @else {
                            <button
                              (click)="demoteToUser(user)"
                              class="text-yellow-600 hover:text-yellow-900"
                            >
                              Rétrograder User
                            </button>
                          }
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            } @else {
              <p class="text-gray-500 text-center py-8">Aucun utilisateur trouvé</p>
            }
          </div>
        </div>
      }

      @if (activeTab() === 'tickets') {
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">Gestion des Tickets</h2>
          </div>
          <div class="p-6">
            @if (todos().length > 0) {
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- À faire -->
                <div class="bg-gray-50 rounded-lg p-4" cdkDropList [cdkDropListData]="todosTodo()" [cdkDropListConnectedTo]="['adminInProgress', 'adminDone']" (cdkDropListDropped)="onAdminTodoDropped($event, 'todo')" id="adminTodo">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">
                    À faire
                    <span class="text-sm text-gray-500">({{ todosTodo().length }})</span>
                  </h3>
                  <div class="space-y-3">
                    @for (todo of todosTodo(); track todo.id) {
                      <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-gray-400" cdkDrag [cdkDragData]="todo">
                        <div class="flex justify-between items-start mb-2">
                          <h4 class="font-medium text-gray-900">{{ todo.title }}</h4>
                        </div>
                        @if (todo.description) {<p class="text-sm text-gray-600 mb-3">{{ todo.description }}</p>}
                      </div>
                    }
                  </div>
                </div>

                <!-- En cours -->
                <div class="bg-gray-50 rounded-lg p-4" cdkDropList [cdkDropListData]="todosInProgress()" [cdkDropListConnectedTo]="['adminTodo', 'adminDone']" (cdkDropListDropped)="onAdminTodoDropped($event, 'in-progress')" id="adminInProgress">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">
                    En cours
                    <span class="text-sm text-gray-500">({{ todosInProgress().length }})</span>
                  </h3>
                  <div class="space-y-3">
                    @for (todo of todosInProgress(); track todo.id) {
                      <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400" cdkDrag [cdkDragData]="todo">
                        <div class="flex justify-between items-start mb-2">
                          <h4 class="font-medium text-gray-900">{{ todo.title }}</h4>
                        </div>
                        @if (todo.description) {<p class="text-sm text-gray-600 mb-3">{{ todo.description }}</p>}
                      </div>
                    }
                  </div>
                </div>

                <!-- Terminé -->
                <div class="bg-gray-50 rounded-lg p-4" cdkDropList [cdkDropListData]="todosDone()" [cdkDropListConnectedTo]="['adminTodo', 'adminInProgress']" (cdkDropListDropped)="onAdminTodoDropped($event, 'done')" id="adminDone">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">
                    Terminé
                    <span class="text-sm text-gray-500">({{ todosDone().length }})</span>
                  </h3>
                  <div class="space-y-3">
                    @for (todo of todosDone(); track todo.id) {
                      <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-400" cdkDrag [cdkDragData]="todo">
                        <div class="flex justify-between items-start mb-2">
                          <h4 class="font-medium text-gray-900">{{ todo.title }}</h4>
                        </div>
                        @if (todo.description) {<p class="text-sm text-gray-600 mb-3">{{ todo.description }}</p>}
                      </div>
                    }
                  </div>
                </div>
              </div>
            } @else {
              <p class="text-gray-500 text-center py-8">Aucun ticket trouvé</p>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class AdminComponent implements OnInit {
  private authService = inject(AuthService);
  private todoService = inject(TodoService);
  private router = inject(Router);

  activeTab = signal<'users' | 'tickets'>('users');
  users = signal<User[]>([]);
  todos = signal<Todo[]>([]);
  successMessage = signal<string | null>(null);
  todosTodo = computed(() => this.todos().filter(t => t.status === 'todo'));
  todosInProgress = computed(() => this.todos().filter(t => t.status === 'in-progress'));
  todosDone = computed(() => this.todos().filter(t => t.status === 'done'));

  async ngOnInit() {
    // Vérifier que l'utilisateur est admin
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
      this.router.navigate(['/todos']);
      return;
    }

    // Charger les données
    await this.loadUsers();
    await this.loadTodos();
  }

  async loadUsers() {
    try {
      const users = await firstValueFrom(this.authService.getAllUsers());
      this.users.set(users);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
    }
  }

  async loadTodos() {
    try {
      const todos = await this.todoService.getAllTodos();
      this.todos.set(todos);
    } catch (error) {
      console.error('Erreur lors du chargement des todos:', error);
    }
  }

  async deleteUser(userId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await firstValueFrom(this.authService.deleteUser(userId));
        await this.loadUsers();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  }

  async promoteToAdmin(user: User) {
    try {
      await firstValueFrom(this.authService.updateUserRole(user.id, 'admin'));
      await this.loadUsers();
      this.showSuccess(`L'utilisateur ${user.name} a été promu admin.`);
    } catch (error) {
      console.error('Erreur lors de la promotion:', error);
    }
  }

  async demoteToUser(user: User) {
    try {
      await firstValueFrom(this.authService.updateUserRole(user.id, 'user'));
      await this.loadUsers();
      this.showSuccess(`L'utilisateur ${user.name} a été rétrogradé utilisateur.`);
    } catch (error) {
      console.error('Erreur lors de la rétrogradation:', error);
    }
  }

  async deleteTodo(todoId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce ticket ?')) {
      try {
        await this.todoService.deleteTodo(todoId);
        await this.loadTodos();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  }

  assignTodo(todo: Todo) {
    console.warn('Assigner le ticket:', todo);
  }

  private showSuccess(message: string) {
    this.successMessage.set(message);
    setTimeout(() => this.successMessage.set(null), 2500);
  }

  async onAdminTodoDropped(event: CdkDragDrop<Todo[]>, targetStatus: 'todo' | 'in-progress' | 'done') {
    const todo = event.item.data as Todo;
    if (todo && todo.status !== targetStatus) {
      await this.todoService.updateTodo(todo.id, { status: targetStatus });
      await this.loadTodos();
      this.showSuccess(`Le ticket "${todo.title}" est passé à "${targetStatus}".`);
    }
  }
}
