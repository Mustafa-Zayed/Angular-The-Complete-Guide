import { Component } from '@angular/core';
import { DashboardItem } from '../shared/dashboard-item/dashboard-item';

@Component({
  selector: 'app-server-status',
  imports: [DashboardItem],
  templateUrl: './server-status.html',
  styleUrl: './server-status.css',
})
export class ServerStatus {
  image = { src: 'status.png', alt: 'A signal symbol' };
  title = 'Server Status';
  currentStatus = 'online';
}
