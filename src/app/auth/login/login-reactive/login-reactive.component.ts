import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) return null;

  return { doesNotContainQuestionMark: true };
}

function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') return of(null);

  return of({ notUnique: true });
}

@Component({
  selector: 'app-login-reactive',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css'],
  imports: [ReactiveFormsModule, JsonPipe],
})
export class LoginReactiveComponent {
  myForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
    }),
  });

  get emailIsInvalid() {
    return (
      this.myForm.get('email')?.invalid &&
      this.myForm.get('email')?.touched &&
      this.myForm.get('email')?.dirty
    );
  }

  get passwordIsInvalid() {
    return (
      this.myForm.get('password')?.invalid &&
      this.myForm.get('password')?.touched &&
      this.myForm.get('password')?.dirty
    );
  }

  onSubmit() {
    // this.myForm.controls.email.addValidators([Validators.required]);
    console.log(this.myForm);
    const email = this.myForm.value.email;
    const password = this.myForm.value.password;
    console.log(email, password);
  }
}
