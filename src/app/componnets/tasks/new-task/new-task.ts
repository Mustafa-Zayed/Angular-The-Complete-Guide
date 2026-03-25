import { Component, inject, input, output } from '@angular/core';
import { TaskInput } from '../task/task.model';
import { TasksService } from '../tasks.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css',
})
export class NewTask {
  userId = input.required<string>();
  closeTask = output<void>();

  enteredTitle = '';
  enteredSummary = '';
  enteredDueDate = '';

  private tasksService = inject(TasksService); // Injecting the TasksService. Alternatively, we could have used the constructor for injection.
  close() {
    this.closeTask.emit();
  }

  onSubmit() {
    let newTask: TaskInput = {
      id: 't' + Math.random().toString(),
      userId: this.userId(),
      title: this.enteredTitle,
      dueDate: this.enteredDueDate,
      summary: this.enteredSummary,
    };
    // console.log('New Task Object:', newTask);

    this.tasksService.saveNewTask(newTask);
    this.closeTask.emit();
  }
}
