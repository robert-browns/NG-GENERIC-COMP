import { Component, OnInit } from '@angular/core';
import { V } from '@angular/core/src/render3';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../shared/generic-components/Constants/constants';

@Component({
  selector: 'app-mat-reactive-forms-using-generic',
  templateUrl: './mat-reactive-forms-using-generic.component.html',
  styleUrls: ['./mat-reactive-forms-using-generic.component.css']
})
export class MatReactiveFormsUsingGenericComponent implements OnInit {

  dropdownControls: FormControl[] = [];
  matForm2: FormGroup;

  states: any;

  // states = [
  //   { id: 'KA', value: 'Karnataka' },
  //   { id: 'BH', value: 'Bihar' },
  //   { id: 'GA', value: 'Goa' },
  // ];




  // states = [];

  // meals ={
  //   {value: }
  // }

  errorType = Constants.ErrorType;
  patternTypes = Constants.PatternTypes;

  // In case where value and viewValue are same. Use [overrideKeyValue]="true" in dropdown 
  // states = [
  //   { id: 'Karnataka', value: 'Karnataka' },
  //   { id: 'Bihar', value: 'Bihar' },
  //   { id: 'Goa', value: 'Goa' },
  // ];

  products = [
    { Id: 119, Name: 'Burger' },
    { Id: 120, Name: 'Pizza' },
    { Id: 121, Name: 'Sandwich' },
  ];

  categories = [
    { Id: 11, Name: 'FNB' },
    { Id: 12, Name: 'Beverages' },
  ];

  productGroups = [
    { Id: 45, Name: 'Foods' },
    { Id: 46, Name: 'Drinks' },
  ];

  fnbDropdownGroupDependencyConfig: Record<string, string[]> = {
    "ProductId": ["ProductGroupId"],
    "CategoryId": ["ProductGroupId", "ProductId"],
    "ProductGroupId": [],
  }

  initForm() {

    let stateId = 1;

    this.matForm2 = this.matForm2Builder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      // state: ['KA', Validators.required],
      state: [stateId.toString(), Validators.required],
      dob: ['', Validators.required],
      adob: ['', Validators.required],
      dobT: ['', Validators.required],
      amount: ['', [Validators.maxLength(9), Validators.pattern('[0-9]+(\.[0-9][0-9]?[0-9]?[0-9]?)?')]],
      married: [false],
      CategoryId: [-1],
      ProductId: [-1],
      ProductGroupId: [-1],
      address: this.matForm2Builder.group({
        line1: [''],
        line2: [''],
        line3: [''],
        city: [''],
        zip: [''],
      })

    })
  }

  constructor(private matForm2Builder: FormBuilder) { }

  ngOnInit() {
    this.initForm();

    setTimeout(() => {
      this.states = [
        { Id: '1', Name: 'Karnataka' },
        { Id: '2', Name: 'Bihar' },
        { Id: '3', Name: 'Goa' },
      ];
      console.log("done!");
    }, 2000);
  }

  onMatSubmit() {
    console.log(this.matForm2.value);

    document.getElementById('matResult').innerText = JSON.stringify(this.matForm2.value, null, 2);

    console.log(this.matForm2.get("firstName").value);
  }

  changeFn(event: Event) {
    console.log("changeFn" + event);
  }
  blurFn() {
    console.log("blurFn");
  }
}
