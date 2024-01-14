import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-textbox',
  templateUrl: './app-custom-textbox.component.html',
  styleUrls: ['./app-custom-textbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppCustomTextboxComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AppCustomTextboxComponent),
      multi: true,
    },
  ]
})

export class AppCustomTextboxComponent implements ControlValueAccessor {

  @Input() maxlength: number = 10;
  @Input() placeholder: string = "Placeholder";
  @Input() hintLabel: string = "Dropdown";

  // @Input() public parentForm: FormGroup;
  @Input() public fieldName: string;

  public value = '';
  public disabled = false;
  public changed: (value: string) => void;
  public touched: () => void;

  public errorMessage: string;
  public isError: boolean;
  @Input() formControl: FormControl;

  validate(control: FormControl) { // TODO: validate will be implement on each derived sub class such as textbox, etc..

    if (control.hasError('required')) {
      // this.errorMessage = this.getErrorMessage();
      this.errorMessage = 'You must enter a value';
      return this.errorMessage;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (control.hasError('email') || !emailPattern.test(control.value)) {
      // this.errorMessage = this.getErrorMessage();
      this.errorMessage = 'Not a valid email'
      return this.errorMessage;
    }

    return '';
  }

  writeValue(value: string): void {
    if (value === null) return;
    this.value = value;
  }

  public onChange(event: Event): void {
    const val: string = (<HTMLInputElement>event.target).value;

    this.changed(val);
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // isErrorExistsForm(): boolean {
  //   // debugger;
  //   console.log(this.formControl);
  //   if ((this.formControl.dirty || this.formControl.touched) && this.formControl.errors) {
  //     return true;
  //   } else {
  //     return false;
  //   }

  // }

  // getErrorMessage(): string {

  //   this.errorMessage = "Invalid Input!"
  //   return this.errorMessage;
  // }

  // getErrorMessage() {

  //   console.log(this.formControl.errors);

  //   if (this.formControl.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.formControl.hasError('email') ? 'Not a valid email' : '';
  // }
}