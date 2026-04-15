import { Routes } from '@angular/router';

import { canLeaveEditPage, NewTaskComponent } from '../tasks/new-task/new-task.component';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';

export const routes: Routes = [
  {
    path: '', // <your-domain>/users/u2
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks', // <your-domain>/users/u3/tasks
    component: TasksComponent,
    resolve: { userTasks: resolveUserTasks },
    runGuardsAndResolvers: 'always', // force the resolver to run every time
  },
  {
    path: 'tasks/new', // <your-domain>/users/u2/tasks/new
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage],
  },
];
