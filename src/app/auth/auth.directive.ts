import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

/**
 * Structural Directive:
 * - Uses TemplateRef & ViewContainerRef in its implementation.
 * - Simply added as an attribute to ng-template or prefixed with * to any other element.
 * - Adds or removes elements from the DOM, based on some condition (in this case, user permissions).
 * */
@Directive({
  selector: '[appAuth]',
  // Can't use hostDirectives property in structural directives, because they are not applied
  // to the host element, but to the template element (ng-template).
  // You can can apply the LogDirective directly to the html element in the template.
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuth' });
  private authService = inject(AuthService);

  // hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
  private hostTemplate = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      if (this.userType() === this.authService.activePermission()) {
        // this.hostElement.nativeElement.style.display = 'block';
        this.viewContainer.createEmbeddedView(this.hostTemplate);
      } else {
        // this.hostElement.nativeElement.style.display = 'none';
        this.viewContainer.clear();
      }
    });
  }
}
