import { Directive, ElementRef, inject, input } from '@angular/core';
import { LogDirective } from './log.directive';

/**
 * Attribute Directive:
 * - Uses ElementRef in its implementation.
 * - Simply added as an attribute to an element.
 * - Adds some behavior to the existing element (in this case, an anchor tag)
 * */
@Directive({
  selector: 'a[appSafeLink]',
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
  // This will apply the LogDirective to the host element of this directive,
  // which is the a[appSafeLink] element.
  // If this directive takes an argument, we can pass it in host property of
  // this directive (a[appSafeLink]).
  hostDirectives: [LogDirective],
})
export class SafeLinkDirective {
  // appSafeLink = input.required<string>();
  queryParam = input<string>('myapp', { alias: 'appSafeLink' });

  private hostElement = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    // console.log('SafeLinkDirective is active!');
  }

  onConfirmLeavePage(event: MouseEvent) {
    console.log(this.hostElement.nativeElement);

    const wantsToLeave = window.confirm('Do you really want to leave this page?');
    if (wantsToLeave) {
      // const anchorElement = event.target as HTMLAnchorElement;
      // anchorElement.href += '?from=' + this.queryParam();

      this.hostElement.nativeElement.href += '?from=' + this.queryParam();

      return;
    }

    event.preventDefault();
  }
}
