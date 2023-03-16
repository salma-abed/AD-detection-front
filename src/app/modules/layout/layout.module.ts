import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MateriallUi } from '../../shared/material-ui.module';
import { LandingContentComponent } from './components/landing-content/landing-content.component';
import { DashboardContentComponent } from './components/dashboard-content/dashboard-content.component';
import { LandingHeaderComponent } from './components/landing-header/landing-header.component';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    LandingContentComponent,
    DashboardContentComponent,
    LandingHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MateriallUi,
    LayoutRoutingModule
  ]
})
export default class LayoutModule { }
