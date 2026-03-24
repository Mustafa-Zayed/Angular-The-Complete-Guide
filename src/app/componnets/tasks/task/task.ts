import { Component, computed, input, Input, output } from '@angular/core'; 
import { type TaskInput } from './task.model';
import { Card } from "../../shared/card/card";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [Card, DatePipe],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  task = input.required<TaskInput>();
  taskComplete = output<string>();

  onCompleteTask() {
    this.taskComplete.emit(this.task().id);
  }
}
