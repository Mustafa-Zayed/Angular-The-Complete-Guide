import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideZonelessChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
  // This sets up Angular's change detection to work without relying on zone.js, which can
  // lead to improved performance and more efficient change detection in our application.
  // By using zoneless change detection, we can depend on Signals to trigger updates to the UI,
  // which can be more efficient than the traditional approach of using zones to detect changes.
  providers: [provideZonelessChangeDetection()],
}).catch((err) => console.error(err));
