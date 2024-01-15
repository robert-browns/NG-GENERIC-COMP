import { AfterContentInit, Component, ContentChildren, Input, OnDestroy, OnInit, QueryList } from '@angular/core';
import { DropdownFormControlComponent } from '../dropdown-form-control/dropdown-form-control.component';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'smnx-dropdowngroup-form-control',
  template: "<ng-content></ng-content>",
  styles: []
})
export class DropdowngroupFormControlComponent implements AfterContentInit, OnDestroy {

  @Input() clearValue: any = -1;

  @ContentChildren(DropdownFormControlComponent) dropdownFormControlList: QueryList<DropdownFormControlComponent>;

  private destroy$ = new Subject<void>();

  constructor() { }

  ngAfterContentInit() {
    this.setupDropdownSubscriptions();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // setupDropdownSubscriptions() {
  //   debugger;
  //   this.dropdownControls.forEach((control, index) => {
  //     control.selectionChanged.subscribe((value) => {
  //       this.handleDropdownChange(value, index);
  //     });
  //   });
  // }

  // handleDropdownChange(selectedValue: any, currentIndex: number) {
  //   debugger;
  //   // Clear and set -1 for other dropdowns
  //   this.dropdownControls.forEach((control, index) => {
  //     if (index !== currentIndex) {
  //       control.clearSelection();
  //     }
  //   });

  // }


  private setupDropdownSubscriptions() {
    // debugger;
    const dropdownFormControls: FormControl[] = this.dropdownFormControlList.map(dropdown => dropdown.formControl);

    dropdownFormControls.forEach((formControl, index) => {
      formControl.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(selectedValue => this.handleDropdownChange(selectedValue, index));
    });
  }

  handleDropdownChange(selectedValue: any, currentIndex: number) {
    debugger;
    // Clear and set -1 for other dropdowns
    this.dropdownFormControlList.forEach((control, index) => {
      if (index !== currentIndex) {
        control.formControl.setValue(this.clearValue, { emitEvent: false });
      }
    });
  }

}
