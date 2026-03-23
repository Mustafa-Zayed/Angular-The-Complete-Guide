import { Component, computed, input, Input, output } from '@angular/core'; 
import { type TaskInput } from './task.model';

@Component({
  selector: 'app-task',
  imports: [],
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
