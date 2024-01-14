import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { debounceTime, map } from 'rxjs/operators';

import { UIConfig, ErrorTypeConfig, SelectOption } from '../Models/generic-components.model';
import { GenericComponentsService } from '../serivces/generic-components.service';

// interface SelectOption {
//   value: string;
//   viewValue: string;
// }

// interface UIConfig {
//   isRequired?: boolean;
//   showHintLabel?: boolean;
//   overrideKeyValue?: boolean;
//   enableSearch?: boolean;
// }

// interface ErrorTypeConfig {
//   errorTypesList?: string[];
//   patternType?: string;
// }

@Component({
  selector: 'smnx-dropdown-form-control',
  templateUrl: './dropdown-form-control.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownFormControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DropdownFormControlComponent),
      multi: true,
    },
  ],
})
export class DropdownFormControlComponent extends BaseFormControlComponent implements OnInit {

  @Input() formControl: FormControl = new FormControl();
  @Input() public fieldName: string;
  @Input() placeholder: string = "placeholder";
  @Input() hintLabel: string = "label";

  @Input() options: SelectOption[] = [];
  filteredOptions: SelectOption[] = [];
  searchControl = new FormControl();

  //UI config options
  // @Input() overrideKeyValue: boolean = false;
  // @Input() enableSearch: boolean = false;
  // @Input() showHintLabel: boolean = true;
  // @Input() isRequired: boolean = false;

  defaultOverrideKeyValue: boolean = false;
  defaultEnableSearch: boolean = false;
  defaultShowHintLabel: boolean = true;
  defaultIsRequired: boolean = false;

  @Input() uiConfig: UIConfig = {};

  public errorMessage: string;
  // public isError: boolean;
  TOOLTIP_POSITION: string = "above"; //TODO: Replace with Constants in WMS

  constructor(private genericCompService: GenericComponentsService) {
    super()
  }

  ngOnInit(): void {

    const defaultUIConfig: UIConfig = {
      showHintLabel: true,
      overrideKeyValue: false,
      enableSearch: false,
      isRequired: false
    }

    this.uiConfig = this.genericCompService.setDefaultValueForConfigs(this.uiConfig, defaultUIConfig);

    this.options.unshift({ value: '', viewValue: '--Select a option--' }); //Add default value at the beginning //TODO: Add message translate

    this.filteredOptions = this.options;

    if (this.uiConfig.enableSearch) {
      // Subscribe to changes in the search control to update the filtered list
      this.searchControl.valueChanges
        .pipe(
          debounceTime(300),
          map(value => value.toLowerCase()),
        )
        .subscribe(value => {
          this.filteredOptions = this.filterOptions(value);
        });
    } else {
      this.searchControl.disable();
    }
  }

  filterOptions(value: string): SelectOption[] {
    return this.options.filter(food =>
      food.viewValue.toLowerCase().includes(value.toLowerCase())
    );
  }

  validate(control: FormControl) {
    if (control.hasError('required')) {
      this.errorMessage = 'Select a value from dropdown'; //TODO: Replace these error messages
      return this.errorMessage;
    }
  }

  public onChange(event: MatSelectChange) {
    // debugger;
    let val: string;
    val = event.value;

    this.setChangedFn(val);
  }

  getOptionValue(option: SelectOption) {
    return option.viewValue === this.filteredOptions[0].viewValue ? '' : option.viewValue;
  }

}
