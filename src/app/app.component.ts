import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TEST-GENERIC-COMP';

  myAppForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.myAppForm = this.fb.group({
      firstName: ['Sammy', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.myAppForm.value);
  }
}
