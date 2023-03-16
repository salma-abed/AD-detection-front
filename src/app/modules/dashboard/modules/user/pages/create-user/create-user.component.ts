import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  public subscription$: Subscription = new Subscription();
  loading:boolean = false;

  constructor(
    private _userService:UserService,
    private _router:Router,
    private _activatedRoute:ActivatedRoute,
    private _toastr:ToastrService,
    ){}

  ngOnInit(): void {
  }

  submit(formGroup:FormGroup){
    if(formGroup?.valid){
      this.loading = true;
      this.subscription$.add(
        this._userService?.createUser(formGroup?.value)?.subscribe({
          next: (res) =>{
            this.loading = false;
            this._toastr.success("User created successfully","Success");
            console.log("success")
            this._router.navigate(['../list'],{relativeTo:this._activatedRoute});
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
