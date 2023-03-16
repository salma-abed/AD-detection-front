import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'ad_detection';
  subscription$:Subscription = new Subscription();

  constructor(
    private _authService:AuthService,
    private _router:Router,
    private _activatedRoute:ActivatedRoute
    ) {
      console.log("hello",this._router.url)
    }

  ngOnInit(): void {
    this.getUserRole();
  }

  getUserRole(){
    if(this._authService.isLogin()){
      this._authService?.profile()?.subscribe({
        next: (userInfo:any) =>{
          this._authService.userInfo.next(userInfo);
          this._authService.userRole = userInfo?.role?.type;
          console.log("this._activatedRoute?.snapshot?.queryParams['backUrl']",this._activatedRoute?.snapshot?.queryParams['backUrl'])
          if(this._activatedRoute?.snapshot?.queryParams['backUrl']){
            this._router.navigate([this._activatedRoute?.snapshot?.queryParams['backUrl']]);
          }
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
