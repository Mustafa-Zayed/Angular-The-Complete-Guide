import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  imports: [],
  templateUrl: './dashboard-item.html',
  styleUrl: './dashboard-item.css',
  // encapsulation: ViewEncapsulation.None, // We can also set this to None to make the styles global, but should use the .dashboard-item not :host in the CSS file.
  // host: { class: 'dashboard-item' },
})
export class DashboardItem {
  image = input.required<{ src: string; alt: string }>();
  title = input.required<string>();
}
