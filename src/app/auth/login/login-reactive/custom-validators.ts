import { AbstractControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';

export function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) return null;

  return { doesNotContainQuestionMark: true };
}

export function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') return of(null);

  return of({ notUnique: true });
}

// Factory function to compare any two controls, not just passwords.
export function equalValues(controlName1: string, controlName2: string): ValidatorFn {
  return (control: AbstractControl) => {
    const control1 = control.get(controlName1)?.value;
    const control2 = control.get(controlName2)?.value;

    if (control1 === control2) return null;

    return { valuesNotEqual: true };
  };
}
