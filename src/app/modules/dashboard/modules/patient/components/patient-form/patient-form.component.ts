import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {
  roles = [
    { title: "Doctor", value:"doctor"},
    { title: "Patient", value:"patient"},
  ];
  genders = [
    { title: "Male", value:"male"},
    { title: "Female", value:"female"},
  ];

  formGroup!:FormGroup;

  constructor(
    private _fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.initForm();
  }

  public getControl(controlName: string):any {
    return this.formGroup.controls[controlName];
  }
  initForm(){
    this.formGroup = this._fb.group({
      email:['',[Validators.required, Validators.email]],
      phoneNumber:['',[Validators.required]],
      name:['',[Validators.required]],
      age:['',[Validators.required]],
      password:['',[Validators.required]],
      gender:['',[Validators.required]],
      role:['',[Validators.required]],
    })
  }
}
