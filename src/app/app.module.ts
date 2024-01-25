import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonOverviewComponent } from './mat-button-overview/mat-button-overview.component';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldsOverviewComponent } from './mat-form-fields-overview/mat-form-fields-overview.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SamplReactiveFormsComponent } from './sampl-reactive-forms/sampl-reactive-forms.component';
import { MatReactiveFormsComponent } from './mat-reactive-forms/mat-reactive-forms.component';
import { MatReactiveFormsUsingGenericComponent } from './mat-reactive-forms-using-generic/mat-reactive-forms-using-generic.component';
import { MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { AppCustomBtnToggleComponent } from './app-custom-btn-toggle/app-custom-btn-toggle.component';
import { AppCustomTextboxComponent } from './app-custom-textbox/app-custom-textbox.component';
import { TextboxFormControlComponent } from './shared/generic-components/textbox-form-control/textbox-form-control.component';
import { DropdownFormControlComponent } from './shared/generic-components/dropdown-form-control/dropdown-form-control.component';
import { AppCustomDropdownComponent } from './app-custom-dropdown/app-custom-dropdown.component';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DatepickerFormControlComponent } from './shared/generic-components/datepicker-form-control/datepicker-form-control.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DatetimepickerFormControlComponent } from './shared/generic-components/datetimepicker-form-control/datetimepicker-form-control.component';
import { CheckboxFormControlComponent } from './shared/generic-components/checkbox-form-control/checkbox-form-control.component';
import { DropdowngroupFormControlComponent } from './shared/generic-components/dropdowngroup-form-control/dropdowngroup-form-control.component';


@NgModule({
  declarations: [
    AppComponent,
    MatButtonOverviewComponent,
    MatFormFieldsOverviewComponent,
    SamplReactiveFormsComponent,
    MatReactiveFormsComponent,
    MatReactiveFormsUsingGenericComponent,
    AppCustomBtnToggleComponent,
    AppCustomTextboxComponent,
    TextboxFormControlComponent,
    DropdownFormControlComponent,
    AppCustomDropdownComponent,
    DatepickerFormControlComponent,
    DatetimepickerFormControlComponent,
    CheckboxFormControlComponent,
    DropdowngroupFormControlComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatCheckboxModule,
    MatTooltipModule,

  ],
  exports: [
    NgxMatSelectSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
