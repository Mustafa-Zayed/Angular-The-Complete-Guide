import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/components/app.component';
import { TasksService } from './app/services/tasks.service';
// import { InjectionToken } from '@angular/core';

bootstrapApplication(AppComponent).catch((err) => console.error(err));

// export const TasksServiceToken = new InjectionToken<TasksService>('TasksService');

bootstrapApplication(AppComponent, {
  // providers: [{ provide: TasksServiceToken, useClass: TasksService }],
  providers: [TasksService],
}).catch((err) => console.error(err));

// providers: [TasksService] is equal to this:
// @Injectable({
//   providedIn: 'root',
// })
// Platform EnvironmentInjector:
// - Does not allow for tree shaking of this service.
// - Always included in the initial code bundle, even if it is not used in the app.
// - The service will be available to all angular apps if there are multiple apps in the project, which can lead to unintended consequences if the service is not meant to be used globally.
// - This is a good option for services that are meant to be used globally across the app, but it is not a good option for services that are only meant to be used by a specific part of the app.
// - Used when we want to provide a service initially in the root of the application,
// so that it can be injected anywhere in the app without needing to specify
// it in the providers array of a component or module.
//
