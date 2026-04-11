import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form = viewChild.required<NgForm>('form');
  email = viewChild.required<NgModel>('email');
  destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      // read from local storage
      const savedLoginForm = localStorage.getItem('saved-login-form');
      console.log(savedLoginForm);

      if (savedLoginForm) {
        const loadedFormData = JSON.parse(savedLoginForm);
        const savedEmail = loadedFormData.email;

        setTimeout(() => {
          this.form().controls['email'].setValue(savedEmail);
          // this.form().setValue({
          //   email: savedEmail,
          //   password: '',
          // });
        }, 1);
      }

      // save to local storage
      const subscription = this.form()
        .valueChanges?.pipe(debounceTime(500))
        .subscribe((changes) =>
          localStorage.setItem(
            'saved-login-form',
            JSON.stringify({
              email: changes.email,
            }),
          ),
        );

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    });
  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }
    const email = formData.form.value.email;
    const password = formData.form.value.password;

    console.log(formData);
    console.log(email, password);

    formData.form.reset();
  }
}
