import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, interval, map, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  desRef = inject(DestroyRef);

  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount); // Convert signal to observable

  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 }); // Convert observable to signal

  // private subscription: Subscription = new Subscription();

  // numbers = interval(1000);
  // takeFourNumbers = this.numbers.pipe(take(4));
  // mapNumbers = this.numbers.pipe(map((x) => x * 2)).pipe(take(4));

  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times.`);
    // });
  }

  ngOnInit(): void {
    // this.subscription = interval(1000).subscribe(
    //   // {
    //   //   next: (value) => console.log(`Interval value: ${value}`),
    //   //   error: (err) => console.error('Error in interval observable:', err),
    //   //   complete: () => console.log('Interval observable completed.'),
    //   // }
    //   (value) => console.log(`Interval value: ${value}`),
    // );
    // setTimeout(() => {
    //   if (this.subscription) {
    //     this.subscription.unsubscribe();
    //     console.log('Subscription unsubscribed after timeout.');
    //   }
    // }, 5000);
    // this.takeFourNumbers.subscribe((x) => console.log('takeFourNumbers: ', x));
    // this.mapNumbers.subscribe((x) => console.log('mapNumbers: ', x));

    const sub = this.clickCount$.subscribe((value) => {
      console.log(`Clicked button ${value} times.`);
    });

    this.desRef.onDestroy(() => {
      sub.unsubscribe();
      console.log('Subscription unsubscribed on component destroy.');
    });
  }

  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
