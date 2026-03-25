import { Component, inject, input } from '@angular/core';
import { type TaskInput } from './task.model';
import { TasksService } from '../tasks.service';
import { Card } from '../../shared/card/card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [Card, DatePipe],
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
