// import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MatSelectChange } from '@angular/material';

// @Component({
//   selector: 'app-base-form-control'
// })
export abstract class BaseFormControlComponent implements ControlValueAccessor {

  // abstract writeValue(value: any): void;
  // abstract registerOnChange(fn: any): void;
  // abstract registerOnTouched(fn: any): void;
  // abstract setDisabledState?(isDisabled: boolean): void;

  abstract transformEventData(event: any): any;

  value = '';
  onChange: (value: any) => void;
  onTouch: () => void;
  // public disabled: boolean = false;

  writeValue(value: any): void {
    if (value === null) return;
    this.value = value;
  }

  // private extractValueFromInput(event: Event): string {
  //   return (event.target as HTMLInputElement).value;
  // }

  // private extractValueFromMatSelect(event: MatSelectChange): string {
  //   return event.value;
  // }

  // public onChangeV1(event: Event | MatSelectChange): void {
  //   // debugger;
  //   let val: string;
  //   switch (true) {
  //     case (event instanceof MatSelectChange):
  //       val = this.extractValueFromMatSelect(event as MatSelectChange);
  //       break;

  //     case (event instanceof Event):
  //       val = this.extractValueFromInput(event as Event);
  //       break;

  //     default:
  //       console.error('Unknown data type for Event. Type: ' + typeof event);
  //       break;
  //   }
  //   this.changed(val);
  // }

  // public onChange(event: any) {
  //   // debugger;
  //   let val: string;
  //   val = (event.target as HTMLInputElement).value;

  //   this.setChangedFn(val);
  // }
  // public onChange(eventData: any) {
  //   this.changed(eventData);
  // }

  // public setChangedFn(eventData: any) {
  //   this.changed(eventData);
  // }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  // setDisabledState?(isDisabled: boolean): void {
  //   this.disabled = isDisabled;
  // }
}
