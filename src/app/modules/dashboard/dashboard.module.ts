import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CustomTableComponent } from 'src/app/shared/components/custom-table/custom-table.component';



@NgModule({

  imports: [
    CommonModule,
    DashboardRoutingModule,
    CustomTableComponent
  ]
})
export default class DashboardModule { }
