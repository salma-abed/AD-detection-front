import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MateriallUi } from '../../material-ui.module';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InputComponent } from 'src/app/shared/components/form-field/input/input.component';
import { SelectComponent } from 'src/app/shared/components/form-field/select/select.component';
import { confirmedValidator } from 'src/app/core/validations/confirm-password.validation';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    MateriallUi,
    MatRadioModule,
    MatSelectModule,
    InputComponent,
    SelectComponent,
    ReactiveFormsModule
   ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  subscription$:Subscription = new Subscription();
  formGroup!:FormGroup;
  loading:boolean = false;
  roles = [];
  genders = [
    {title:"Male",value:"male"},
    {title:"Female",value:"female"},
  ];
  constructor(
    private _authService:AuthService,
    private _fb:FormBuilder,
    private _toastr:ToastrService,
    private _router:Router
    ){ }

  ngOnInit(): void{
    this.getRoles();
    this.initFormGroup();
  }

  initFormGroup(){
    this.formGroup = this._fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      phone: ['',[Validators.required]],
      password: ['',[Validators.required]],
      confirmPassword: ['',[Validators.required]],
      role: ['',[Validators.required]],
      gender: ['',[Validators.required]],
    },
    {
      validator: confirmedValidator('password', 'confirmPassword'),
    });
  }

  getControl(controlName: string):any {
    return this.formGroup.controls[controlName];
  }

  getRoles(){
    this.subscription$.add(
      this._authService.getRoles({
        app:"frontend-app",
        select: "title _id"
      })?.subscribe({
        next: (res:any) =>{
          console.log("res?.data",res?.data)
          this.roles = res?.data?.map( (role:any) =>{
            return {
              title: role?.title?.en,
              value: role?._id
            }
          });
        }
      })
    )
  }

  submit(){
    if(this.formGroup?.valid){
      this.loading = true;
      this.subscription$.add(
        this._authService?.signup(this.formGroup?.value)?.subscribe({
          next: (res:any) => {
            localStorage?.setItem("token",res?.token);
            this._toastr.success("Your are logged in successfully","Success")
            this._authService.userInfo.next(res);
            this._authService.userRole = res?.role?.type;
            this._router?.navigate(['/dashboard']);
            this.loading = false;
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

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
