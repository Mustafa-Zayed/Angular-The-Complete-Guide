import { Component, inject, input } from '@angular/core';
import { type TaskInput } from './task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  task = input.required<TaskInput>();
  private tasksService = inject(TasksService);

  onCompleteTask() {
    this.tasksService.onCompleteTask(this.task().id);
  }
}
