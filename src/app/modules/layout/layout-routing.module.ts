import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { haveAccess } from 'src/app/core/guards/auth.guard';
import { DashboardContentComponent } from './components/dashboard-content/dashboard-content.component';
import { LandingContentComponent } from './components/landing-content/landing-content.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardContentComponent,
    canActivate:[() => haveAccess(['superadmin','admin','doctor','patient'])],
    children: [
      { path: '', loadChildren: () => import('../dashboard/dashboard.module') },
    ]
  },
  {
    path: 'landing',
    component: LandingContentComponent,
    children: [
      { path: '', loadChildren: () => import('../../modules/landing/landing.module') },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
