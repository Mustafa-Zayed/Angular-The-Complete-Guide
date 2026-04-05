import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../../../services/tasks.service';
import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.model';
// import { TasksServiceToken } from '../../../../main';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  // Example of providing a non-service, non-class, just a value at the component level.
  // Providing the task status options here, so that it can be injected in this component and
  // its child components.
  providers: [taskStatusOptionsProvider],
})
export class TasksListComponent {
  private selectedFilter = signal<string>('all');
  private tasksService = inject(TasksService); // TasksServiceToken

  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.tasksService.tasks$().filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksService.tasks$().filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksService.tasks$().filter((task) => task.status === 'DONE');
      default:
        return this.tasksService.tasks$();
    }
  });

  taskStatusOptions = inject(TASK_STATUS_OPTIONS);

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
