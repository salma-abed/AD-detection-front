import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy{
  subscription$:Subscription = new Subscription();
  userInfo!:any;

  items = [
    {
      name: 'Home',
      icon: 'home',
      link: '/landing',
      levels:[1,2,3],
    }, {
      name: 'Dashboard',
      icon: 'dashboard',
      link: 'dashboard',
      levels:[1,2,3],
    },
    {
      name: 'Users',
      icon: 'people',
      link: '/dashboard/user',
      levels:[1,2],
    },
    {
      name: 'Patient',
      icon: 'accessible',
      link: '/dashboard/patient',
      levels:[1,2],
    },
    {
      name: 'Reports',
      icon: 'assignment_ind',
      link: '/dashboard/report',
      levels:[1,2,3],
    }
  ];
  constructor(private _authService:AuthService) {}


  ngOnInit(): void {
    this.getUserRole();
  }

  logout(){
    this._authService?.logout();
  }

  getUserRole(){
    this._authService?.userInfo?.subscribe({
      next: (userInfo) =>{
        this.userInfo = userInfo;
        this.items = this.items?.filter(item => !item?.levels?.length || item?.levels?.includes(userInfo?.role?.level));
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }


}
