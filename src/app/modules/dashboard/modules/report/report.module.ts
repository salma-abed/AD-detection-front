import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportsListComponent } from './pages/reports-list.component';
import { EditReportComponent } from './pages/edit-report/edit-report.component';
import { ViewReportComponent } from './pages/view-report/view-report.component';
import { CreateReportComponent } from './pages/create-report/create-report.component';
import { ReportFormComponent } from './components/report-form/report-form.component';
import { CustomTableComponent } from 'src/app/shared/components/custom-table/custom-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from 'src/app/shared/components/form-field/input/input.component';
import { SelectComponent } from 'src/app/shared/components/form-field/select/select.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    ReportsListComponent,
    EditReportComponent,
    ViewReportComponent,
    CreateReportComponent,
    ReportFormComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    CustomTableComponent,
    MatIconModule,
    MatDialogModule,
    InputComponent,
    SelectComponent,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule
  ]
})
export default class ReportModule { }
