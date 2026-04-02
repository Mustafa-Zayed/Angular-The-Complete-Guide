import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
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
