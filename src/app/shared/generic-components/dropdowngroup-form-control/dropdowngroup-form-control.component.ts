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

  @Input() dependencyConfig: Record<string, string[]> = {};

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
    // const dropdownFormControls: FormControl[] = this.dropdownFormControlList.map(dropdown => dropdown.formControl);

    // dropdownFormControls.forEach((formControl, index) => {
    //   formControl.valueChanges
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe(selectedValue => this.handleDropdownChange(selectedValue, index));
    // });

    this.dropdownFormControlList.forEach((dropdown) => {
      dropdown.formControl.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.handleDropdownChange(dropdown.formControlName));
    });
  }

  handleDropdownChange(currentDropdownName: string) {
    // debugger;
    //get the currentIndex control details
    // const currentDropdownName = this.dropdownFormControlList.toArray()[currentIndex].uniqueFormControlId;
    // console.log("currentIndex formControls: ", currentDropdownName);

    // const dependentDropdowns = this.dependencyConfig[currentDropdownName];

    // // Clear and set -1 for other dropdowns
    // // this.dropdownFormControlList.forEach((control, index) => {
    // //   console.log("control uniqueFormControlId:", control.uniqueFormControlId);
    // //   if (index !== currentIndex) {
    // //     control.formControl.patchValue(this.clearValue, { emitEvent: false });
    // //   }
    // // });

    // if (dependentDropdowns) {
    //   // Clear dependent dropdowns
    //   this.dropdownFormControlList.forEach((control, index) => {
    //     const formControlName = control.uniqueFormControlId;
    //     if (index !== currentIndex && dependentDropdowns.includes(formControlName)) {
    //       control.formControl.patchValue(this.clearValue, { emitEvent: false });
    //     }
    //   });
    // }

    if (this.dependencyConfig === undefined) {
      this.dependencyConfig = {};
    }

    const dependentDropdowns = this.dependencyConfig[currentDropdownName];

    if (dependentDropdowns) {
      this.dropdownFormControlList.forEach((control) => {
        const formControlName = control.formControlName;
        if (formControlName !== currentDropdownName && dependentDropdowns.includes(formControlName)) {
          control.formControl.patchValue(this.clearValue, { emitEvent: false });
        }
      });
    }
    else {
      this.dropdownFormControlList.forEach((control) => {
        const formControlName = control.formControlName;
        if (formControlName !== currentDropdownName) {
          control.formControl.patchValue(this.clearValue, { emitEvent: false });
        }
      });
    }
  }

}
