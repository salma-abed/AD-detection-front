import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

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
export class DashboardComponent {

  dashboardItem = [
    {
      title: 'Users',
      icon: 'people',
      total: '200',
      route:'user'
    },
    {
      title: 'Doctor',
      icon: 'work',
      total: '150',
      route:'user'
    },
    {
      title: 'Patient',
      icon: 'accessible',
      total: '1000',
      route:'patient'
    },
    {
      title: 'Reports',
      icon: 'assignment_ind',
      total: '200',
      route:'report'
    }
  ]

}
