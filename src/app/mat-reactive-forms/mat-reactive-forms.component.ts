import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mat-reactive-forms',
  templateUrl: './mat-reactive-forms.component.html',
  styleUrls: ['./mat-reactive-forms.component.css']
})
export class MatReactiveFormsComponent implements OnInit {

  constructor(private matFormBuilder: FormBuilder) { }

  matForm = this.matFormBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.matFormBuilder.group({
      line1: [''],
      line2: [''],
      line3: [''],
      city: [''],
      zip: [''],
    })
  })

  ngOnInit() {
  }

  isErrorExistsForm(fields: string) {
    return (this.matForm.controls[fields].dirty || this.matForm.controls[fields].touched) && this.matForm.controls[fields].errors;
  }

  getErrorMessage(fieldName: string) {
    return `${fieldName} is required!`;
  }

  onMatSubmit() {
    console.log(this.matForm.value);

    document.getElementById('matResult').innerText = JSON.stringify(this.matForm.value);
  }

}
