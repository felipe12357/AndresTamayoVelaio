import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss'],
  imports:[CommonModule],
  standalone: true
})
export class FormValidationComponent {
  @Input() formControlTocheck!: AbstractControl<any, any> | null;
  @Input() validationToCheck!:string;
  @Input() outputMessage!:string;
  @Input() hasbeenSubmitted!:boolean;
}
