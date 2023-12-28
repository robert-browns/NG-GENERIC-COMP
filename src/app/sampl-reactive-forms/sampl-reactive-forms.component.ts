import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sampl-reactive-forms',
  templateUrl: './sampl-reactive-forms.component.html',
  styleUrls: ['./sampl-reactive-forms.component.css']
})
export class SamplReactiveFormsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  // testForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   address: new FormGroup({
  //     line1: new FormControl(''),
  //     line2: new FormControl(''),
  //     line3: new FormControl(''),
  //     city: new FormControl(''),
  //     zip: new FormControl(''),
  //   })
  // });

  // testForm = this.formBuilder.group({
  //   firstName: [''],
  //   lastName: [''],
  //   address: this.formBuilder.group({
  //     line1: [''],
  //     line2: [''],
  //     line3: [''],
  //     city: [''],
  //     zip: [''],
  //   }),
  // })


  states = [
    { value: 'karnataka', viewValue: 'Karnataka' },
    { value: 'bihar', viewValue: 'Bihar' },
    { value: 'goa', viewValue: 'Goa' },
  ];

  testForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.formBuilder.group({
      line1: [''],
      line2: [''],
      line3: [''],
      state: [''],
      city: [''],
      zip: [''],
    }),
  })

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.testForm.value);

    document.getElementById('result').innerText = JSON.stringify(this.testForm.value);
  }

}
