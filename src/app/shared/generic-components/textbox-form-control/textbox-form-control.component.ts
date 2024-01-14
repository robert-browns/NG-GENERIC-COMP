import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component'
import { GenericComponentsService } from '../serivces/generic-components.service';

import { UIConfig, ErrorTypeConfig } from '../Models/generic-components.model';


@Component({
  selector: 'smnx-textbox-form-control',
  templateUrl: './textbox-form-control.component.html',
  styleUrls: ['./textbox-form-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextboxFormControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextboxFormControlComponent),
      multi: true,
    },
  ],
})
export class TextboxFormControlComponent extends BaseFormControlComponent implements OnInit {

  @Input() formControl: FormControl = new FormControl();
  @Input() fieldName: string;
  @Input() maxlength: number = 99;
  @Input() placeholder: string = 'placeholder';
  @Input() hintLabel: string = 'label';
  @Input() fieldType: 'text' | 'email' | 'password' = 'text';

  //UI config options
  @Input() uiConfig: UIConfig = {} as UIConfig;
  @Input() errorTypeConfig: ErrorTypeConfig = {} as ErrorTypeConfig;

  errorMessage: string;
  TOOLTIP_POSITION: string = "above"; //TODO: Replace with Constants in WMS

  constructor(private genericCompService: GenericComponentsService) {
    super()
  }

  ngOnInit(): void {
    const defaultUIConfig: UIConfig = {
      showHintLabel: true,
      showMaxlength: true,
      isRequired: false
    }

    const defaultErrorTypeConfig: ErrorTypeConfig = {
      errorTypesList: [],
      patternType: ""
    }

    this.uiConfig = this.genericCompService.setDefaultValueForConfigs(this.uiConfig, defaultUIConfig);
    this.errorTypeConfig = this.genericCompService.setDefaultValueForConfigs(this.errorTypeConfig, defaultErrorTypeConfig);

  }

  validate(control: FormControl) {

    this.errorMessage = this.genericCompService.getErrorMessage(control, this.errorTypeConfig.errorTypesList, this.errorTypeConfig.patternType, []); //TODO: Add the localizedData here in WMS

    return this.errorMessage;
  }

}
