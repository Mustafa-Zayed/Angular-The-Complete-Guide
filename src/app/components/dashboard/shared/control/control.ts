import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  imports: [],
  templateUrl: './control.html',
  styleUrl: './control.css',
  /**
   * Always use None for encapsulation when the component selector is used as a wrapper for projected content,
   * because we want the styles to be applied to the projected content, not just the host elements.
   * We can also set the class here using the host property, or we can set the property directly in the template.
   * But we can't use :host in the CSS file with using the ViewEncapsulation.None.
   * */
  encapsulation: ViewEncapsulation.None, // Use None to allow styles to be applied globally because the html will be projected into another component, and we want the styles to be applied to the projected content, not just the host elements.
  // We can't use :host in the CSS file in this case, so we set the class here using the host property, or we can set the property directly in the template.
  host: {
    class: 'control',
    '(click)': 'onClick()',
  },
})
export class Control {
  // @HostBinding('class') className = 'control';
  // @HostListener('click') onClick() {console.log('Control clicked!');}

  label = input.required<string>();
  private el = inject(ElementRef);

  onClick() {
    console.log(this.el);
  }
}
