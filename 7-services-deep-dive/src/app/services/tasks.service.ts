import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from '../components/tasks/task.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>(
    localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')!) : [],
  );
  private loggingService = inject(LoggingService);

  get tasks$() {
    return this.tasks.asReadonly();
  }

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      id: Math.random().toString(),
      title: taskData.title,
      description: taskData.description,
      status: 'OPEN',
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
    this.saveTasksToLocalStorage();
    this.loggingService.log('ADDED TASK WITH TITLE ' + taskData.title);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)),
    );
    this.saveTasksToLocalStorage();
    this.loggingService.log('CHANGE TASK STATUS TO ' + newStatus);
  }

  private saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }
}
