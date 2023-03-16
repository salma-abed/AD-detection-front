import { Component, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',

  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy{
  @Output() toggleMenu:EventEmitter<any> = new EventEmitter();

  subscription$:Subscription = new Subscription();
  userInfo!:any;
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
        console.log("userInfo",userInfo)
        this.userInfo = userInfo;
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
