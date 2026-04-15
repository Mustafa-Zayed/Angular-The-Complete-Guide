import { NgModule } from '@angular/core';
import { UserInput } from './user-input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserInput],
  imports: [FormsModule],
  exports: [UserInput],
})
export class UserInputModule {}
