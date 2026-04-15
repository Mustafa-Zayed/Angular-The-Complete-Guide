import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailIsUnique, mustContainQuestionMark } from './custom-validators';
import { debounceTime } from 'rxjs';

let initialEmail = '';
const savedLoginForm = localStorage.getItem('saved-login-form');

if (savedLoginForm) {
  const loadedFormData = JSON.parse(savedLoginForm);
  initialEmail = loadedFormData.email;
}

@Component({
  selector: 'app-login-reactive',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css'],
  imports: [ReactiveFormsModule, JsonPipe],
})
export class LoginReactiveComponent implements OnInit {
  myForm = new FormGroup({
    email: new FormControl(initialEmail, {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
    }),
  });

  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // Because we are using reactive forms and doing all the work in the TS, we can egt the initial value
    // outside of the component.
    // // read from local storage
    // const savedLoginForm = localStorage.getItem('saved-login-form');

    // if (savedLoginForm) {
    //   const loadedFormData = JSON.parse(savedLoginForm);
    //   const savedEmail = loadedFormData.email;

    //   // this.myForm.controls.email.setValue(savedEmail);
    //   this.myForm.patchValue({
    //     email: savedEmail,
    //   });
    // }

    // save to local storage
    const subscription = this.myForm.valueChanges.pipe(debounceTime(500)).subscribe((changes) =>
      localStorage.setItem(
        'saved-login-form',
        JSON.stringify({
          email: changes.email,
        }),
      ),
    );

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

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
