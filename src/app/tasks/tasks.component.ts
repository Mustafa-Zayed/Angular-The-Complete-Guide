import { Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userId = input.required<string>(); // extracted from parent route

  private tasksService = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  // order = input<'asc' | 'desc'>(); // extracted from query param with help of withComponentInputBinding() in app.config file.
  order = signal('asc');
  userTasks = computed(() =>
    this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId())
      .sort((a, b) => {
        if (this.order() === 'asc') {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        } else {
          return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        }
      }),
  );

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe((params) =>
      this.order.set(params['order'] || 'asc'),
    );

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
