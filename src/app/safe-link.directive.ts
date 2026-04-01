import { Directive, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  // appSafeLink = input.required<string>();
  queryParam = input<string>('myapp', { alias: 'appSafeLink' });

  constructor() {
    console.log('SafeLinkDirective is active!');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Do you really want to leave this page?');
    if (wantsToLeave) {
      const anchorElement = event.target as HTMLAnchorElement;
      const address = anchorElement.href + '?from=' + this.queryParam();
      anchorElement.href = address;
      return;
    }

    event.preventDefault();
  }
}
