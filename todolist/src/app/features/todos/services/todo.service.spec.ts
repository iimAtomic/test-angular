// src/app/features/todos/services/todo.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { CreateTodoRequest } from '../models/todo.model';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with seeded todos', async () => {
    const todos = await service.getAllTodos();
    expect(todos.length).toBe(3);
  });

  it('should add todo correctly', async () => {
    const request: CreateTodoRequest = {
      title: 'Test Todo',
      description: 'Test Description',
      priority: 'medium',
    };

    const created = await service.createTodo(request);
    const todos = await service.getAllTodos();

    expect(todos.length).toBe(4);
    expect(created.title).toBe(request.title);
    expect(created.description).toBe(request.description);
    expect(created.priority).toBe(request.priority);
    expect(created.status).toBe('todo');
  });

  it('should compute completed todos correctly', () => {
    expect(service.completedTodos().length).toBe(1);
  });

  it('should compute pending todos correctly', () => {
    expect(service.pendingTodos().length).toBe(1);
  });

  it('should compute in-progress todos correctly', () => {
    expect(service.inProgressTodos().length).toBe(1);
  });

  it('should compute stats correctly', () => {
    const stats = service.todoStats();
    expect(stats.total).toBe(3);
    expect(stats.completed).toBe(1);
    expect(stats.pending).toBe(1);
    expect(stats.inProgress).toBe(1);
    expect(stats.highPriority).toBe(2);
    expect(stats.completionRate).toBe(33.33333333333333);
  });
});