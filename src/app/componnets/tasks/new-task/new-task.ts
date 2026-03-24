import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { dummyTasks } from '../dummy-tasks';
import { TaskInput } from '../task/task.model';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css',
})
export class NewTask {
  userId = input.required<string>();
  cancelTask = output<void>();
  submitTask = output<TaskInput>();

  enteredTitle = '';
  enteredSummary = '';
  enteredDueDate = '';

  onCancel() {
    this.cancelTask.emit();
  }

  onSubmit() {
    let newTask: TaskInput = {
      id: 't' + Math.random().toString(),
      userId: this.userId(),
      title: this.enteredTitle,
      dueDate: this.enteredDueDate,
      summary: this.enteredSummary
    };
    // console.log('New Task Object:', newTask);
    
    this.submitTask.emit(newTask);
  }
}
