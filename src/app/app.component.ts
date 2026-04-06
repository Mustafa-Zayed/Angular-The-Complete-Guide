import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval, map, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  numbers = interval(1000);
  takeFourNumbers = this.numbers.pipe(take(4));
  mapNumbers = this.numbers.pipe(map((x) => x * 2)).pipe(take(4));

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe(
      // {
      //   next: (value) => console.log(`Interval value: ${value}`),
      //   error: (err) => console.error('Error in interval observable:', err),
      //   complete: () => console.log('Interval observable completed.'),
      // }
      (value) => console.log(`Interval value: ${value}`),
    );

    setTimeout(() => {
      if (this.subscription) {
        this.subscription.unsubscribe();
        console.log('Subscription unsubscribed after timeout.');
      }
    }, 5000);

    this.takeFourNumbers.subscribe((x) => console.log('takeFourNumbers: ', x));
    this.mapNumbers.subscribe((x) => console.log('mapNumbers: ', x));
  }
}
