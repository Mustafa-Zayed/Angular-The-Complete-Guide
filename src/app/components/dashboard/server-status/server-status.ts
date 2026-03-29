import { Component, signal } from '@angular/core';
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
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');

  constructor() {
    setInterval(() => {
      const rnd = Math.random(); // 0 - 0.99999999999999

      console.log('Random number for status update:', rnd);
      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);
  }
}
