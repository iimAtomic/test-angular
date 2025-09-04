// src/app/features/todos/components/todo-list.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { PriorityPipe } from '../../../shared/pipes/priority.pipe';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Todo } from '../models/todo.model';
import { FormsModule } from '@angular/forms';
import { CreateTodoRequest } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PriorityPipe, HighlightDirective, DragDropModule],
  template: `
    <!-- Formulaire de création -->
    <form class="mb-8 bg-white p-4 rounded-lg shadow flex flex-col gap-3" (ngSubmit)="createTodo()">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
          <input
            type="text"
            class="w-full border rounded px-3 py-2"
            [ngModel]="title()"
            (ngModelChange)="title.set($event)"
            name="title"
            required
            placeholder="Ex: Implémenter l'auth"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            class="w-full border rounded px-3 py-2"
            [ngModel]="description()"
            (ngModelChange)="description.set($event)"
            name="description"
            placeholder="Détails (optionnel)"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
          <select
            class="w-full border rounded px-3 py-2"
            [ngModel]="priority()"
            (ngModelChange)="priority.set($event)"
            name="priority"
          >
            <option value="low">Faible</option>
            <option value="medium">Moyenne</option>
            <option value="high">Haute</option>
          </select>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          [disabled]="!title().trim() || creating()"
        >
          {{ creating() ? 'Création…' : 'Ajouter la tâche' }}
        </button>
        @if (errorMessage()) {
          <span class="text-sm text-red-600">{{ errorMessage() }}</span>
        }
      </div>
    </form>
    <!-- Dashboard des statistiques -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Statistiques en temps réel</h2>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-sm font-medium text-gray-500">Total</h3>
          <p class="text-2xl font-bold text-gray-900">{{ todoService.todoStats().total }}</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-sm font-medium text-gray-500">Complétés</h3>
          <p class="text-2xl font-bold text-green-600">{{ todoService.todoStats().completed }}</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-sm font-medium text-gray-500">En cours</h3>
          <p class="text-2xl font-bold text-blue-600">{{ todoService.todoStats().inProgress }}</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-sm font-medium text-gray-500">Priorité haute</h3>
          <p class="text-2xl font-bold text-red-600">{{ todoService.todoStats().highPriority }}</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-sm font-medium text-gray-500">Taux de complétion</h3>
          <p class="text-2xl font-bold text-purple-600">{{ todoService.todoStats().completionRate | number:'1.0-0' }}%</p>
        </div>
      </div>
    </div>

    <!-- Colonnes Kanban -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- À faire -->
      <div class="bg-gray-50 rounded-lg p-4" cdkDropList [cdkDropListData]="todoService.pendingTodos()" [cdkDropListConnectedTo]="['inProgressList', 'doneList']" (cdkDropListDropped)="onTodoDropped($event, 'todo')" id="todoList">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          À faire
          <span class="text-sm text-gray-500">({{ todoService.pendingTodos().length }})</span>
        </h3>
        <div class="space-y-3">
          @for (todo of todoService.pendingTodos(); track todo.id) {
            <div
              class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-gray-400"
              cdkDrag
              [cdkDragData]="todo"
              [appHighlight]="todo.priority === 'high' ? 'rgba(239, 68, 68, 0.1)' : 'transparent'"
              [appHighlightDelay]="todo.priority === 'high' ? 500 : 0"
            >
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-medium text-gray-900">{{ todo.title }}</h4>
                <span
                  class="px-2 py-1 text-xs font-semibold rounded-full"
                  [class.bg-red-100]="todo.priority === 'high'"
                  [class.text-red-800]="todo.priority === 'high'"
                  [class.bg-yellow-100]="todo.priority === 'medium'"
                  [class.text-yellow-800]="todo.priority === 'medium'"
                  [class.bg-green-100]="todo.priority === 'low'"
                  [class.text-green-800]="todo.priority === 'low'"
                >
                  {{ todo.priority | priority }}
                </span>
              </div>
              @if (todo.description) {
                <p class="text-sm text-gray-600 mb-3">{{ todo.description }}</p>
              }
              <div class="flex justify-between items-center text-xs text-gray-500">
                <span>Créé le {{ todo.createdAt | date:'dd/MM/yyyy' }}</span>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- En cours -->
      <div class="bg-gray-50 rounded-lg p-4" cdkDropList [cdkDropListData]="todoService.inProgressTodos()" [cdkDropListConnectedTo]="['todoList', 'doneList']" (cdkDropListDropped)="onTodoDropped($event, 'in-progress')" id="inProgressList">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          En cours
          <span class="text-sm text-gray-500">({{ todoService.inProgressTodos().length }})</span>
        </h3>
        <div class="space-y-3">
          @for (todo of todoService.inProgressTodos(); track todo.id) {
            <div
              class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400"
              cdkDrag
              [cdkDragData]="todo"
              [appHighlight]="todo.priority === 'high' ? 'rgba(239, 68, 68, 0.1)' : 'transparent'"
              [appHighlightDelay]="todo.priority === 'high' ? 500 : 0"
            >
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-medium text-gray-900">{{ todo.title }}</h4>
                <span
                  class="px-2 py-1 text-xs font-semibold rounded-full"
                  [class.bg-red-100]="todo.priority === 'high'"
                  [class.text-red-800]="todo.priority === 'high'"
                  [class.bg-yellow-100]="todo.priority === 'medium'"
                  [class.text-yellow-800]="todo.priority === 'medium'"
                  [class.bg-green-100]="todo.priority === 'low'"
                  [class.text-green-800]="todo.priority === 'low'"
                >
                  {{ todo.priority | priority }}
                </span>
              </div>
              @if (todo.description) {
                <p class="text-sm text-gray-600 mb-3">{{ todo.description }}</p>
              }
              <div class="flex justify-between items-center text-xs text-gray-500">
                <span>Mis à jour le {{ todo.updatedAt | date:'dd/MM/yyyy' }}</span>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Terminé -->
      <div class="bg-gray-50 rounded-lg p-4" cdkDropList [cdkDropListData]="todoService.completedTodos()" [cdkDropListConnectedTo]="['todoList', 'inProgressList']" (cdkDropListDropped)="onTodoDropped($event, 'done')" id="doneList">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Terminé
          <span class="text-sm text-gray-500">({{ todoService.completedTodos().length }})</span>
        </h3>
        <div class="space-y-3">
          @for (todo of todoService.completedTodos(); track todo.id) {
            <div
              class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-400"
              cdkDrag
              [cdkDragData]="todo"
              [appHighlight]="todo.priority === 'high' ? 'rgba(34, 197, 94, 0.1)' : 'transparent'"
              [appHighlightDelay]="todo.priority === 'high' ? 500 : 0"
            >
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-medium text-gray-900 line-through">{{ todo.title }}</h4>
                <span
                  class="px-2 py-1 text-xs font-semibold rounded-full"
                  [class.bg-red-100]="todo.priority === 'high'"
                  [class.text-red-800]="todo.priority === 'high'"
                  [class.bg-yellow-100]="todo.priority === 'medium'"
                  [class.text-yellow-800]="todo.priority === 'medium'"
                  [class.bg-green-100]="todo.priority === 'low'"
                  [class.text-green-800]="todo.priority === 'low'"
                >
                  {{ todo.priority | priority }}
                </span>
              </div>
              @if (todo.description) {
                <p class="text-sm text-gray-600 mb-3 line-through">{{ todo.description }}</p>
              }
              <div class="flex justify-between items-center text-xs text-gray-500">
                <span>Terminé le {{ todo.updatedAt | date:'dd/MM/yyyy' }}</span>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class TodoListComponent {
  todoService = inject(TodoService);
  title = signal<string>('');
  description = signal<string>('');
  priority = signal<'low' | 'medium' | 'high'>('medium');
  creating = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  async onTodoDropped(
    event: CdkDragDrop<Todo[]>,
    targetStatus: 'todo' | 'in-progress' | 'done'
  ) {
    const todo = event.item.data;
    if (todo && todo.status !== targetStatus) {
      await this.todoService.updateTodo(todo.id, { status: targetStatus });
    }
  }

  async createTodo() {
    if (!this.title().trim()) return;
    this.creating.set(true);
    this.errorMessage.set(null);
    try {
      const payload: CreateTodoRequest = {
        title: this.title().trim(),
        description: this.description().trim(),
        priority: this.priority(),
      };
      await this.todoService.createTodo(payload);
      this.title.set('');
      this.description.set('');
      this.priority.set('medium');
    } catch (e) {
      this.errorMessage.set('Impossible de créer la tâche, réessayez.');
      console.error(e);
    } finally {
      this.creating.set(false);
    }
  }
}