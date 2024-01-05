import { Component, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component';

@Component({
  selector: 'smnx-datetimepicker-form-control',
  templateUrl: './datetimepicker-form-control.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimepickerFormControlComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatetimepickerFormControlComponent),
      multi: true
    }
  ]
})
export class DatetimepickerFormControlComponent extends BaseFormControlComponent {

  public errorMessage: string;

  @Input() formControl: FormControl = new FormControl();
  @Input() fieldName: string;
  // @Input() maxlength: number = 10;
  @Input() placeholder: string = 'placeholder';
  @Input() hintLabel: string = 'label';
  @Input() showHintLabel: boolean = true;
  @Input() showMaxlength: boolean = false;

  // @Input() public fieldType: 'text' | 'email' | 'password' = 'text';

  // validate(control: FormControl) {
  //   if (control.hasError('required')) {
  //     this.errorMessage = 'Please select a date'; //TODO: Replace these error messages
  //     return this.errorMessage;
  //   }
  //   this.errorMessage = null;
  //   return this.errorMessage;
  // }

  // validate(control: FormControl) {
  //   if (control.errors && control.errors.required) {
  //     // this.formControl.setErrors({ 'required': true });
  //     // return { required: true };
  //     this.errorMessage = "Please select a date"
  //     return this.errorMessage;
  //   } else {
  //     // this.formControl.setErrors(null);
  //     return null;
  //   }
  // }

  validate(control: FormControl) {
    if (control.errors && control.errors.required) {
      this.errorMessage = 'Please select a date';
      return { required: true };
    }
    // else if (control.value && !(control.value instanceof Date)) {
    //   this.errorMessage = 'Invalid date format';
    //   return { invalidDate: true };
    // } 
    else {
      this.errorMessage = '';
      return null;
    }
  }


  public onChange(event: any) {
    debugger;
    const selectedDate = event.value === '' ? '' : event.value.toLocaleString();

    //for datepicker onChnage itself marks it as touched, and clears errors when a date is selected.
    if (selectedDate) {
      this.formControl.markAsTouched();
      this.formControl.setErrors(null);
      this.errorMessage = null
    }

    this.setChangedFn(selectedDate);
  }

  public clearDate() {
    this.formControl.setValue('');
  }
}
