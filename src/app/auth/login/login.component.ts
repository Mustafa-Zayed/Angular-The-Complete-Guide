import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }
    const email = formData.form.value.email;
    const password = formData.form.value.password;

    console.log(formData);
    // console.log(email, password);
  }
}
