import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent {
  userInfo!:any;
  subscription$: Subscription = new Subscription();

  constructor(
    private _userService:UserService,
    private _activatedRoute:ActivatedRoute,
    ){}

  ngOnInit(): void {
    this.getUserById();
  }


  getUserById(){
    this.subscription$.add(
      this._userService?.getUserById(this._activatedRoute?.snapshot?.params['id'])?.subscribe({
        next: (res) =>{
          this.userInfo = res;
        }
      })
    )
  }

  ngOnDestroy(){
    this.subscription$?.unsubscribe();
  }
}
