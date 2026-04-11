import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';

export function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) return null;

  return { doesNotContainQuestionMark: true };
}

export function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') return of(null);

  return of({ notUnique: true });
}
