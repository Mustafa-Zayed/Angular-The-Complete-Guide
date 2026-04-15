import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

import { Task } from './task/task';
import { Tasks } from './tasks';
import { NewTask } from './new-task/new-task';

@NgModule({
  declarations: [Tasks, Task, NewTask],
  imports: [SharedModule, CommonModule, FormsModule], // Importing CommonModule is more correct than BrowserModule in feature modules. BrowserModule should only be imported in the root module (AppModule).
  exports: [Tasks],
})
export class TasksModule {}
