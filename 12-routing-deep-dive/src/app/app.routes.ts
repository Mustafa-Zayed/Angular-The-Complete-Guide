import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';

import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as userRoutes } from './users/users.routes';
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 0.5) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  {
    path: '', // <your-domain>/
    component: NoTaskComponent,
    // redirectTo: 'users/u1',
    // pathMatch: 'full',
    title: 'No Task Selected',
  },
  {
    path: 'users/:userId', // <your-domain>/users/u2
    component: UserTasksComponent,
    children: userRoutes,
    // canMatch: [dummyCanMatch],
    data: { message: 'Hello!' }, // pass static data to the route
    resolve: { userName: resolveUserName }, // fetch the userName before the route is activated and pass it to the component
    title: resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
