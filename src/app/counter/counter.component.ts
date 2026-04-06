import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  // Using OnPush here to demonstrate that this component or its children will only re-render when its
  // inputs, signals or events are changed or emitted, not for every change detection cycle.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit {
  // private zone = inject(NgZone);
  count = signal(0);
  // count = 0;

  ngOnInit() {
    setTimeout(() => {
      this.count.set(0);
      // this.count = 0; // This will not trigger change detection because we are updating a primitive value directly, and Angular's change detection won't detect this change. To make it work, we would need to use a signal so that Angular can track for changes.
    }, 4000);

    // Avoid zone pollution.
    // this.zone.runOutsideAngular(() => {
    setTimeout(() => {
      console.log('Timer expired!');
    }, 5000);
    // });
  }

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
    // this.count = this.count - 1;
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
    // this.count = this.count + 1;
  }
}
