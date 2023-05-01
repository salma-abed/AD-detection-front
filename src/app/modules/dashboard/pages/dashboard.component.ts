import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserService } from '../modules/user/services/user.service';
import { ReportService } from '../modules/report/services/report.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  dashboardItem = [
    {
      title: 'Doctor',
      icon: 'work',
      total: '0',
      route:'user'
    },
    {
      title: 'Patient',
      icon: 'accessible',
      total: '0',
      route:'patient'
    },
    {
      title: 'Reports under classification',
      icon: 'assignment_ind',
      total: '5',
      route:'user'
    },
    {
      title: 'Reports',
      icon: 'assignment_ind',
      total: '0',
      route:'report'
    }
  ]

  constructor(
    private _userService: UserService,
    private _reportService: ReportService,
  ){ }

  ngOnInit(): void {
    this.getPatients();
    this.getReports();
  }

  getPatients(){
    this._userService?.getList({role:"6102ef52c543fa4f5c1d5aa4"})?.subscribe({
      next: (res:any) => {
        this.dashboardItem[1].total = res?.totalCount;
      }
    })
  }

  getReports(){
    this._reportService?.getList({})?.subscribe({
      next: (res:any) => {
        this.dashboardItem[3].total = res?.totalCount;
      }
    })
  }
}
