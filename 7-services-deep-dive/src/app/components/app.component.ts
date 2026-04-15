import { Component } from '@angular/core';

import { TasksComponent } from './tasks/tasks.component';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [TasksComponent],
  // If we only inject this service only in this Element Injector, we can not use
  // it in TasksService, as Services are not a part of the DOM nor reach this Element Injector.
  // providers: [LoggingService],
})
export class AppComponent {}
