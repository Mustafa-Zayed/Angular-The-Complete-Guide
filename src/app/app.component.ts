import { Component } from '@angular/core';

import { LoginComponent } from './auth/login/login/login.component';
import { LoginReactiveComponent } from './auth/login/login-reactive/login-reactive.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LoginReactiveComponent],
})
export class AppComponent {}
