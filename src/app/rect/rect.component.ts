import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-rect',
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  /*// width = input.required<string>();
  // height = input.required<string>();
  //
  // // The output properties must be named as input + 'Change' to work with [(...)] syntax
  // widthChange = output<string>(); // Two-way bindable property for width
  // heightChange = output<string>(); // Two-way bindable property for height*/

  // Easier way to implement two-way binding using model
  width = model.required<string>();
  height = model.required<string>();

  onReset() {
    // this.widthChange.emit('150');
    // this.heightChange.emit('200');

    this.width.set('150');
    this.height.set('200');
  }
}
