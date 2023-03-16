import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientsListComponent } from './pages/patients-list.component';
import { EditPatientComponent } from './pages/edit-patient/edit-patient.component';
import { ViewPatientComponent } from './pages/view-patient/view-patient.component';
import { CreatePatientComponent } from './pages/create-patient/create-patient.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { CustomTableComponent } from 'src/app/shared/components/custom-table/custom-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { InputComponent } from 'src/app/shared/components/form-field/input/input.component';
import { SelectComponent } from 'src/app/shared/components/form-field/select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PatientsListComponent,
    EditPatientComponent,
    ViewPatientComponent,
    CreatePatientComponent,
    PatientFormComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    CustomTableComponent,
    MatDialogModule,
    MatIconModule,
    InputComponent,
    SelectComponent,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export default class PatientModule { }
