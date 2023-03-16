import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { haveAccess } from 'src/app/core/guards/auth.guard';

import { DashboardComponent } from './pages/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [

  { path: '', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'user',
    canActivate:[() => haveAccess(['superadmin','admin','doctor'])],
    loadChildren: () => import("./modules/user/user.module") },
  {
    path: 'report',
    loadChildren: () => import("./modules/report/report.module") },
  {
    path: 'patient',
    canActivate:[() => haveAccess(['superadmin','admin','doctor'])],
    loadChildren: () => import("./modules/patient/patient.module") },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
