import { Component, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component';

@Component({
  selector: 'smnx-checkbox-form-control',
  templateUrl: './checkbox-form-control.component.html',
  styles: [],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxFormControlComponent),
    multi: true,
  },
    // {
    //   provide: NG_VALIDATORS,
    //   useExisting: forwardRef(() => CheckboxFormControlComponent),
    //   multi: true,
    // }
  ]
})
export class CheckboxFormControlComponent extends BaseFormControlComponent {


  @Input() formControl: FormControl = new FormControl();
  @Input() label: string = 'label';

  // public errorMessage: string = "";

  // validate(control: FormControl) {

  //   this.errorMessage = 'Please select checkbox!';

  // }

  public onChange(event: Event) {

    let val: boolean;
    val = (event.target as HTMLInputElement).checked;

    this.setChangedFn(val);
  }

}
