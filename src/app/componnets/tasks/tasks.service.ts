import { Injectable, signal } from '@angular/core';
import { dummyTasks } from './dummy-tasks';
import { TaskInput } from './task/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  signalDummyTasks = signal(dummyTasks);

  constructor() {
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
      this.signalDummyTasks.set(JSON.parse(storedTasks));
    }
  }

  getUsersTasks(userId: string) {
    return this.signalDummyTasks().filter((task) => task.userId === userId);
  }

  saveNewTask(task: TaskInput) {
    this.signalDummyTasks.update((tasks) => [...tasks, task]);
    this.updateLocalStorage();
  }

  onCompleteTask(taskId: string) {
    this.signalDummyTasks.set(this.signalDummyTasks().filter((task) => task.id !== taskId));
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.signalDummyTasks()));
  }
}
