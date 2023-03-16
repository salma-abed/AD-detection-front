import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy{
  data:any;
  public subscription$: Subscription = new Subscription();
  loading:boolean = false;
  constructor(
    private _userService:UserService,
    private _router:Router,
    private _activatedRoute:ActivatedRoute,
    private _toastr:ToastrService,
    ){}

  ngOnInit(): void {
    this.getUserById();
  }


  getUserById(){
    this.subscription$.add(
      this._userService?.getUserById(this._activatedRoute?.snapshot?.params['id'])?.subscribe({
        next: (res) =>{
          this.data = res;
        }
      })
    )
  }

  submit(formGroup:FormGroup){
    if(formGroup?.valid){
      if(!formGroup?.value?.password?.length){
        delete formGroup?.value?.password
      }
      this.loading = true;
      this.subscription$.add(
        this._userService?.updateUserById(this._activatedRoute?.snapshot?.params['id'],formGroup?.value)?.subscribe({
          next: (res:any) =>{
            this.loading = false;
            this._toastr.success("User updated successfully","Success");
            console.log("success")
            this._router.navigate(['../../list'],{relativeTo:this._activatedRoute});
          },
          error:(err:any) => {
            let serverErrors = err?.error?.message;
            if(typeof serverErrors == "string"){
              this._toastr.error(serverErrors,"Error")
            } else if (typeof serverErrors == "object") {
              this._toastr.error(Object.values(serverErrors as any)?.join(","),"Error")
            }
            this.loading = false;
          },
        })
      )
    }
  }

  ngOnDestroy(){
    this.subscription$?.unsubscribe();
  }
}
