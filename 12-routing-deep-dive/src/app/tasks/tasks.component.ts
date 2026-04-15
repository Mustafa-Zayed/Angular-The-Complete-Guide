import { Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterStateSnapshot,
} from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userId = input.required<string>(); // extracted from parent route
  order = input<'asc' | 'desc'>(); // extracted from query param with help of withComponentInputBinding() in app.config file.
  userTasks = input.required<Task[]>();

  // private tasksService = inject(TasksService);
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);

  // order = signal('asc');
  // userTasks = computed(() =>
  //   this.tasksService
  //     .allTasks()
  //     .filter((task) => task.userId === this.userId())
  //     .sort((a, b) => {
  //       if (this.order() === 'asc') {
  //         return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  //       } else {
  //         return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
  //       }
  //     }),
  // );

  // ngOnInit(): void {
  //   const subscription = this.activatedRoute.queryParams.subscribe((params) =>
  //     this.order.set(params['order'] || 'asc'),
  //   );

  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }
}

export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot,
) => {
  const tasksService = inject(TasksService);
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasks = tasksService
    .allTasks()
    .filter((task) => task.userId === activatedRouteSnapshot.params['userId'])
    .sort((a, b) => {
      if (order === 'asc') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else {
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }
    });
  return tasks.length > 0 ? tasks : [];
};
