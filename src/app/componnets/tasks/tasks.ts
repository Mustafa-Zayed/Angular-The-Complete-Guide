import { Component, computed, input, Input, signal } from '@angular/core';
import { Task } from './task/task';
import { DUMMY_USERS } from '../user/dummy-users';
import { dummyTasks } from './dummy-tasks';
import { NewTask } from './new-task/new-task';
import { TaskInput } from './task/task.model';

@Component({
  selector: 'app-tasks',
  imports: [Task, NewTask],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  userName = input.required<string>();
  signalDummyTasks = signal(dummyTasks);
  newTaskDialog = false;

  userId = computed(() => {
    return DUMMY_USERS.find(user => user.name === this.userName())!.id;
  });

  selectedUserTasks = computed(() => {
    return this.signalDummyTasks().filter(task => task.userId === this.userId());
  });

  onCompleteTask(taskId: string) {
    this.signalDummyTasks.set(this.signalDummyTasks().filter(task => task.id !== taskId));
  }

  showTaskDialog() {
    this.newTaskDialog = true;
  }

  saveNewTask(task: TaskInput) {
    this.signalDummyTasks.update(tasks => [...tasks, task]);
    this.newTaskDialog = false;
  }

  closeNewTaskModal() {
    this.newTaskDialog = false;
  }
}
