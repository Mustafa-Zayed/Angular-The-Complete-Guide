import { DatePipe, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TemperaturePipe } from './directives/temperature.pipe';
import { SortPipe } from './directives/sort.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [DatePipe, DecimalPipe, TemperaturePipe, SortPipe],
})
export class AppComponent {
  currentDate = new Date();

  currentTemperaturs = {
    berlin: 4.2749812,
    newYork: 18.1214,
    paris: 72.1209001,
    chicago: 65.0775238,
  };

  historicTemperatures = [25, 37, 19, -4, 28, 21, 19, 28, 33, 31, 9, 11, 5, -12, -5];

  onReset(index: number) {
    // Pipes will not detect changes if we mutate the array directly,
    // so we need to create a new array reference to trigger change detection.
    this.historicTemperatures[index] = 18; // Must set pure pipe to false to detect this change, but it's not recommended.

    // const newTemp = [...this.historicTemperatures];
    // newTemp[index] = 18;
    // this.historicTemperatures = newTemp;
  }
}
