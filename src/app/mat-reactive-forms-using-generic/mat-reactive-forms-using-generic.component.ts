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
    { value: 'KA', viewValue: 'Karnataka' },
    { value: 'BH', viewValue: 'Bihar' },
    { value: 'GA', viewValue: 'Goa' },
  ];

  /*  Move below to Model class in separate file
   //TODO: Create a Model of an export class with field name such as firstName, etc..

   //TODO: Create a formControls using Model using Creation() fn
    //Here, in component add below
    // For table screens - pass the model to SelectionModel in a variable
    
    // For Popup screens - have model created from creation() 
   
    //Here, in component add below
    // For table screens - pass the model to SelectionModel in a variable
    
    // For Popup screens - have model created from creation() 

 */


  matForm2 = this.matForm2Builder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    state: ['', Validators.required],
    dob: ['', Validators.required],
    adob: ['', Validators.required],
    dobT: ['', Validators.required],
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

  // onDateChange(event: any) {
  //   debugger;
  //   const selectedDate = event.target.value;

  //   if (selectedDate) {
  //     const selectedDateTime = new Date(`${selectedDate}T00:00:00.000Z`);
  //     const formattedDate = selectedDateTime.toISOString();

  //     // Now 'formattedDate' has the desired format with timezone information
  //     console.log(formattedDate);
  //   }
  // }

  changeFn(event: Event) {
    console.log("changeFn" + event);
  }
  blurFn() {
    console.log("blurFn");
  }
}
