import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateReportComponent } from './pages/create-report/create-report.component';
import { EditReportComponent } from './pages/edit-report/edit-report.component';
import { ReportsListComponent } from './pages/reports-list.component';
import { ViewReportComponent } from './pages/view-report/view-report.component';

const routes: Routes = [
  { path: '', redirectTo:'list', pathMatch: 'full'},
  { path: 'list', component: ReportsListComponent},
  { path: 'create', component: CreateReportComponent},
  { path: 'edit/:id', component: EditReportComponent},
  { path: 'view/:id', component: ViewReportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
