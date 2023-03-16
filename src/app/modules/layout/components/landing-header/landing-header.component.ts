import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent implements OnInit, OnDestroy{
  subscription$:Subscription = new Subscription();
  userInfo!:any;
  constructor(private _authService:AuthService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  logout(){
    this._authService?.logout();
  }

  getUserInfo(){
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
