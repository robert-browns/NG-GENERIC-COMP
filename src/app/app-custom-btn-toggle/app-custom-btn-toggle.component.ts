import { Component, HostListener, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-btn-toggle',
  templateUrl: './app-custom-btn-toggle.component.html',
  styleUrls: ['./app-custom-btn-toggle.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AppCustomBtnToggleComponent
    }
  ]
})
export class AppCustomBtnToggleComponent implements ControlValueAccessor {
  pressed = false;
  disabled = false;
  onChange: OnChangeFn<boolean> = () => { };
  onTouch: onTouchFn = () => { };

  writeValue(obj: boolean): void {
    if (obj === null) return;
    this.pressed = !!obj;
  }

  registerOnChange(fn: OnChangeFn<boolean>): void {
    this.onChange = fn
  }

  registerOnTouched(fn: onTouchFn): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onToggle() {
    this.pressed = !this.pressed;
    this.onChange(this.pressed);
  }

  @HostListener("focusout")
  onFocusOut() {
    this.onTouch();
  }

}

type OnChangeFn<T> = (value: T) => void;
type onTouchFn = () => void;