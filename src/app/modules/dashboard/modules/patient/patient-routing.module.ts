import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePatientComponent } from './pages/create-patient/create-patient.component';
import { EditPatientComponent } from './pages/edit-patient/edit-patient.component';
import { PatientsListComponent } from './pages/patients-list.component';
import { ViewPatientComponent } from './pages/view-patient/view-patient.component';

const routes: Routes = [
  { path: '', redirectTo:'list', pathMatch: 'full'},
  { path: 'list', component: PatientsListComponent},
  { path: 'create', component: CreatePatientComponent},
  { path: 'edit/:id', component: EditPatientComponent},
  { path: 'view/:id', component: ViewPatientComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
