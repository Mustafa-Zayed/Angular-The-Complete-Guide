import { Routes } from '@angular/router';

import { NewTaskComponent } from '../tasks/new-task/new-task.component';
import { TasksComponent } from '../tasks/tasks.component';

export const routes: Routes = [
  {
    path: '', // <your-domain>/users/u2
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks', // <your-domain>/users/u3/tasks
    component: TasksComponent,
    // resolve: { userTasks: resolveUserTasks },
    // runGuardsAndResolvers: 'paramsOrQueryParamsChange', // force the resolver to run every time the route params or query params change
  },
  {
    path: 'tasks/new', // <your-domain>/users/u2/tasks/new
    component: NewTaskComponent,
  },
];
