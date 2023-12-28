import { Component, OnInit } from '@angular/core';
import { V } from '@angular/core/src/render3';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-mat-reactive-forms-using-generic',
  templateUrl: './mat-reactive-forms-using-generic.component.html',
  styleUrls: ['./mat-reactive-forms-using-generic.component.css']
})
export class MatReactiveFormsUsingGenericComponent implements OnInit {

  states = [
    { value: '', viewValue: '--Select a option--' },
    { value: 'karnataka', viewValue: 'Karnataka' },
    { value: 'bihar', viewValue: 'Bihar' },
    { value: 'goa', viewValue: 'Goa' },
  ];

  matForm2 = this.matForm2Builder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    state: [''],
    address: this.matForm2Builder.group({
      line1: [''],
      line2: [''],
      line3: [''],
      city: [''],
      zip: [''],
    })
  })

  constructor(private matForm2Builder: FormBuilder) { }

  ngOnInit() {
  }

  onMatSubmit() {
    console.log(this.matForm2.value);

    document.getElementById('matResult').innerText = JSON.stringify(this.matForm2.value);
  }
}
