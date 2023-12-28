import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component'

@Component({
  selector: 'app-textbox-form-control',
  templateUrl: './textbox-form-control.component.html',
  styleUrls: ['./textbox-form-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextboxFormControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextboxFormControlComponent),
      multi: true,
    },
  ],
})
export class TextboxFormControlComponent extends BaseFormControlComponent {


  public errorMessage: string;

  @Input() formControl: FormControl = new FormControl();
  @Input() fieldName: string;
  @Input() maxlength: number = 10;
  @Input() placeholder: string = 'placeholder';
  @Input() hintLabel: string = 'label';
  @Input() showHintLabel: boolean = false;
  @Input() showMaxlength: boolean = false;

  @Input() public fieldType: 'text' | 'email' | 'password' = 'text';

  // public value = '';
  // public disabled: boolean = false;
  // public changed: (value: string) => void;
  // public touched: () => void;

  // writeValue(value: any): void {
  //   if (value === null) return;
  //   this.value = value;
  // }

  // public onChange(event: Event): void {
  //   const val: string = (<HTMLInputElement>event.target).value;

  //   this.changed(val);
  // }

  // registerOnChange(fn: any): void {
  //   this.changed = fn;
  // }

  // registerOnTouched(fn: any): void {
  //   this.touched = fn;
  // }

  // setDisabledState?(isDisabled: boolean): void {
  //   this.disabled = isDisabled;
  // }

  validate(control: FormControl) {

    switch (this.fieldType) {
      case 'email':
        if (control.hasError('required')) {
          this.errorMessage = 'You must enter a email address';
          return this.errorMessage;
        }
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.errorMessage = emailPattern.test(control.value) ? '' : 'Not a valid email';
        break;
      case 'password':
        if (control.hasError('required')) {
          this.errorMessage = 'You must enter a password';
          return this.errorMessage;
        }
        const passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
        this.errorMessage = passwordPattern.test(control.value) ? '' : 'Password must be at least 8 characters long and include at least one special character, one uppercase letter, and one number';
        break;

      default:
        if (control.hasError('required')) {
          this.errorMessage = 'You must enter a value';
          return this.errorMessage;
        }
        this.errorMessage = ''
        break;
    }
    return this.errorMessage;
  }

}
