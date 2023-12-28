import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { debounceTime, map } from 'rxjs/operators';

interface SelectOption {
  value: string;
  viewValue: string;
}

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

  @Input() options: SelectOption[] = [];
  filteredOptions: SelectOption[] = [];
  searchControl = new FormControl();

  @Input() maxlength: number = 10;
  @Input() placeholder: string = "placeholder";
  @Input() hintLabel: string = "label";

  @Input() public fieldName: string;
  @Input() formControl: FormControl;

  @Input() overrideKeyValue: Boolean = false;
  @Input() enableSearch: Boolean = false;

  public errorMessage: string;
  public isError: boolean;

  ngOnInit(): void {
    debugger
    this.filteredOptions = this.options;

    if (this.enableSearch) {
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
      this.errorMessage = 'Select one of value from dropdown'; //TODO: Replace these error messages
      return this.errorMessage;
    }
  }

}
