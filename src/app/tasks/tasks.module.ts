import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { TasksRoutingModule } from './tasks-routing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValidationComponent } from '../utils/form-validation/form-validation.component';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    FormValidationComponent
  ]
})
export class TasksModule { }
