import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, forwardRef } from '@angular/core';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { debounceTime, map } from 'rxjs/operators';

import { UIConfig, SelectOption } from '../Models/generic-components.model';
import { GenericComponentsService } from '../serivces/generic-components.service';
import { Subscription } from 'rxjs';


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
export class DropdownFormControlComponent extends BaseFormControlComponent implements OnInit, OnChanges, OnDestroy {


  @Input() formControl: FormControl = new FormControl();
  @Input() public fieldName: string;
  @Input() placeholder: string = "placeholder";
  @Input() hintLabel: string = "label";

  @Input() options: SelectOption[] = [];
  private originalOptions: SelectOption[] = [];
  searchControl = new FormControl();

  @Input() formControlName: string;

  private dropdownValueChangesSubscription: Subscription;

  defaultOverrideKeyValue: boolean = false;
  defaultEnableSearch: boolean = false;
  defaultShowHintLabel: boolean = true;
  defaultIsRequired: boolean = false;

  @Input() uiConfig: UIConfig = {};

  public errorMessage: string;
  // public isError: boolean;
  TOOLTIP_POSITION: string = "above"; //TODO: Replace with Constants in WMS

  // @Output() selectionChanged: EventEmitter<any> = new EventEmitter<any>();

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

    if (this.options === undefined || this.options.length === 0) {
      this.options = [{ Id: "-1", Name: "<Select>" }]
    }
    else {
      this.originalOptions = [...this.options];
      this.setupDropdownSearch(this.originalOptions);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.handleOptionsChange()
  }

  ngOnDestroy(): void {
    this.dropdownValueChangesSubscription.unsubscribe();
  }

  private handleOptionsChange(): void {
    if (this.options && this.options.length > 0) {
      this.originalOptions = [...this.options];

      this.setupDropdownSearch(this.originalOptions);
    }
  }

  private setupDropdownSearch(originalOptions: SelectOption[]) {
    if (this.uiConfig.enableSearch) {
      this.dropdownValueChangesSubscription = this.searchControl.valueChanges
        .pipe(
          debounceTime(300),
          map(value => value.toLowerCase())
        )
        .subscribe(value => {
          this.options = this.filterOptions(value, originalOptions);
        });
    } else {
      this.searchControl.disable();
    }
  }

  private filterOptions(value: string, originalOptions: SelectOption[]): SelectOption[] {
    if (value === '' || value === null) {
      return originalOptions;
    }

    return originalOptions.filter(option =>
      option.Name.toLowerCase().includes(value.toLowerCase())
    );
  }

  validate(control: FormControl) {
    if (control.hasError('required')) {
      this.errorMessage = 'Select a value from dropdown'; //TODO: Replace these error messages
      return this.errorMessage;
    }
  }

  // public onChange(event: MatSelectChange) {
  //   let val: string;
  //   val = event.value;

  //   this.setChangedFn(val);
  // }

  transformEventData(event: MatSelectChange): string {
    let val: string = event.value;
    return val;
  }

  getOptionValue(option: SelectOption) {
    return option.Name === this.options[0].Name ? '' : option.Name;
  }

}
