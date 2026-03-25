import { Component, computed, input } from '@angular/core';
import { Task } from './task/task';
import { DUMMY_USERS } from '../user/dummy-users';
import { NewTask } from './new-task/new-task';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  imports: [Task, NewTask],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  userName = input.required<string>();
  newTaskDialog = false; // can use signal(false) for this as well, but we will keep it simple for now.

  constructor(private tasksService: TasksService) {}

  userId = computed(() => {
    return DUMMY_USERS.find((user) => user.name === this.userName())!.id;
  });

  selectedUserTasks = computed(() => {
    return this.tasksService.getUsersTasks(this.userId());
  });

  showTaskDialog() {
    this.newTaskDialog = true;
  }

  closeNewTaskModal() {
    this.newTaskDialog = false;
  }
}
