import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  // Element Injector: The injector that is created for an element in the template of this component. This means that the service will be available to all child components of this component, but not to any other components in the app.
  // Provide the service that will be shared among child components of this component,
  // tied to the element injector that belongs to the tree level of this component (component used in the template of this component).
  // This means that all child components of this component will get the same instance of the service.
  // If we had provided the service in the root injector, then all components in the app would share the same instance of the service.
  // By providing it here, we limit the scope of the service to this component and its children, which is a good practice for services that are only used by a specific part of the app.
  /////////////////
  // Note: Every instance of this TasksComponent will get its own isolated instance of the TasksService, which means
  // that if we have multiple instances of the TasksComponent in our app, they will not share the same tasks
  // data. This is because the service is provided at the component level, not at the root level.
  // providers: [TasksService],
})
export class TasksComponent {}
