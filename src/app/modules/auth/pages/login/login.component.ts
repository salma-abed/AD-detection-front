import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriallUi } from '../../material-ui.module';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from 'src/app/shared/components/form-field/input/input.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { passwordValidator } from 'src/app/core/validations/confirm-password.validation';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    MateriallUi,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup!:FormGroup;
  loading:boolean = false;
  subscription$:Subscription = new Subscription();

  constructor(
    private _authService:AuthService,
    private _fb:FormBuilder,
    private _toastr:ToastrService,
    private _router:Router,
    ) {}

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup(){
    this.formGroup = this._fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, passwordValidator]],
    });
  }

  getControl(controlName: string):any {
    return this.formGroup.controls[controlName];
  }

  submit(){
    if(this.formGroup?.valid){
      this.loading = true;
      this.subscription$.add(
        this._authService?.login(this.formGroup?.value)?.subscribe({
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
