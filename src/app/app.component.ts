import { Component, computed, inject } from '@angular/core';

import { AuthComponent } from './auth/auth.component';
import { LearningResourcesComponent } from './learning-resources/learning-resources.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [AuthComponent, LearningResourcesComponent],
})
export class AppComponent {
  private authService: AuthService = inject(AuthService);
  isAdmin = computed(() => this.authService.activePermission() === 'admin');
}
