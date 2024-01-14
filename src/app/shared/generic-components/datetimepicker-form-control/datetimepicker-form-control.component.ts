import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component';
import { UIConfig } from '../Models/generic-components.model';
import { GenericComponentsService } from '../serivces/generic-components.service';

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
export class DatetimepickerFormControlComponent extends BaseFormControlComponent implements OnInit {

  @Input() formControl: FormControl = new FormControl();
  @Input() fieldName: string;
  @Input() placeholder: string = 'placeholder';
  @Input() hintLabel: string = 'label';

  //UI config options
  @Input() uiConfig: UIConfig = {} as UIConfig;


  public errorMessage: string;
  TOOLTIP_POSITION: string = "above"; //TODO: Replace with Constants in WMS

  constructor(private genericCompService: GenericComponentsService) {
    super();
  }

  ngOnInit(): void {
    const defaultUIConfig: UIConfig = {
      isRequired: false
    }

    this.uiConfig = this.genericCompService.setDefaultValueForConfigs(this.uiConfig, defaultUIConfig);
  }


  validate(control: FormControl) {

    if (control.errors && control.errors.required) {
      this.errorMessage = 'Please select a date';
    }
    // else if (control.value && !(control.value instanceof Date)) {
    //   this.errorMessage = 'Invalid date format';
    //   return { invalidDate: true };
    // } 
    else {
      this.errorMessage = '';
    }
    return this.errorMessage
  }



  public onChange(event: any) {
    const selectedDate = event.value === '' ? '' : event.value.toLocaleString();

    //for datepicker onChange itself marks it as touched, and clears errors when a date is selected.
    if (selectedDate) {
      this.formControl.markAsTouched();
      this.formControl.setErrors(null);
      this.formControl.updateValueAndValidity();
    }

    this.setChangedFn(selectedDate);
  }

  public clearDate(event: Event) {

    event.stopPropagation();

    this.formControl.setValue('');
    this.formControl.markAsUntouched();
    this.formControl.setErrors({ required: true });
    this.formControl.updateValueAndValidity();
  }
}
