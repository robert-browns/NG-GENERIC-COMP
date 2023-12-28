// import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

// @Component({
//   selector: 'app-base-form-control'
// })
export abstract class BaseFormControlComponent implements ControlValueAccessor {

  // abstract writeValue(value: any): void;
  // abstract registerOnChange(fn: any): void;
  // abstract registerOnTouched(fn: any): void;
  // abstract setDisabledState?(isDisabled: boolean): void;

  public value = '';
  public changed: (value: string) => void;
  public touched: () => void;
  public disabled: boolean = false;

  writeValue(value: any): void {
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
}
