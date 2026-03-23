import { Component, computed, input, Input, signal } from '@angular/core';
import { Task } from './task/task';
import { DUMMY_USERS } from '../user/dummy-users';
import { dummyTasks } from './dummy-tasks';

@Component({
  selector: 'app-tasks',
  imports: [Task],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  userName = input.required<string>();
  signalDummyTasks = signal(dummyTasks);

  userId = computed(() => {
    return DUMMY_USERS.find(user => user.name === this.userName())!.id;
  });

  selectedUserTasks = computed(() => {
    return this.signalDummyTasks().filter(task => task.userId === this.userId());
  });

  onCompleteTask(taskId: string) {
    this.signalDummyTasks.set(this.signalDummyTasks().filter(task => task.id !== taskId));
  }

}
