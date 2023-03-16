import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges, OnDestroy, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PatientService } from '../../../patient/services/patient.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() data:any;
  @Input() loading:boolean = false;
  @Output() submit: EventEmitter<FormGroup> = new EventEmitter();
  subscription$:Subscription = new Subscription();
  imageSrc!: string | null;
  patientFilterCriteria = {
    limit:10000,
    page:1
  }
  patients!:any;
  formGroup!:FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _patientService: PatientService
  ){}

  ngOnInit(): void {
    this.initForm();
    this.listPatients();
  }

  listPatients(){
    this.loading = true;
    this.subscription$.add(
      this._patientService
        .getList(this.patientFilterCriteria)
        .subscribe({
          next: (res: any) => {
            let { data, totalCount } = res;

            let totalElements = parseInt(totalCount);
            let totalPages = Math.ceil(parseInt(totalCount)/this.patientFilterCriteria.limit);
            this.patients = {data,totalElements,totalPages};
            this.loading = false;
          },
          error: (errors) => {
            this.loading = false;
          },
        })
    );
  }

  getControl(controlName: string):any {
    return this.formGroup.controls[controlName];
  }

  initForm(){
    this.formGroup = this._fb.group({
      file:[''],
      patient:[this.data?.patient?._id || '',[Validators.required]],
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.formGroup?.controls['file']?.setValue(file);
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = (reader.result as string);
    reader.readAsDataURL(file);

  }

  submitForm(){
    if(this.formGroup?.valid){
      if(!this.imageSrc && this.data.file?.src){
        this.formGroup?.controls['file']?.setValue(JSON.stringify(this.data.file));
      }
      this.submit.emit(this.formGroup);
    }
  }
  ngOnChanges(simpleChanges:SimpleChanges): void {
    let dataCurrentValue = simpleChanges['data']?.currentValue;
    if(dataCurrentValue){
      this.data.role = dataCurrentValue?.role?._id
      this.initForm();
    }
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
