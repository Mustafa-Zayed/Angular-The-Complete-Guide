import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../../services/tasks.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
  private taskService = inject(TasksService);

  onAddTask(title: string, description: string) {
    if (!title || !description) return;

    const newTask = {
      title,
      description,
    };

    this.taskService.addTask(newTask);
    this.formEl()?.nativeElement.reset();
  }
}
