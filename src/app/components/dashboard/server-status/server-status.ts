import { AfterViewInit, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { DashboardItem } from '../shared/dashboard-item/dashboard-item';

@Component({
  selector: 'app-server-status',
  imports: [DashboardItem],
  templateUrl: './server-status.html',
  styleUrl: './server-status.css',
})
export class ServerStatus implements OnInit, AfterViewInit {
  image = { src: 'status.png', alt: 'A signal symbol' };
  title = 'Server Status';

  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
  private intervalId?: ReturnType<typeof setInterval>;
  private destroyRef = inject(DestroyRef);

  // keep the constructor empty and lean. Just use it for class properties initialization, not for logic.
  constructor() {}

  ngOnInit(): void {
    console.log('ON INIT');
    this.intervalId = setInterval(() => {
      const rnd = Math.random(); // 0 - 0.99999999999999

      // console.log('Random number for status update:', rnd);
      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {
      console.log('ON DESTROY - destroyRef');
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    });
  }

  ngAfterViewInit() {
    console.log('AFTER VIEW INIT');
  }

  // ngOnDestroy(): void {
  //   console.log('ON DESTROY');
  //   if (this.intervalId) {
  //     clearInterval(this.intervalId);
  //   }
  // }
}
