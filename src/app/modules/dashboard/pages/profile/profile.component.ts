import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { InputComponent } from 'src/app/shared/components/form-field/input/input.component';
import { SelectComponent } from 'src/app/shared/components/form-field/select/select.component';
import { UtilityService } from 'src/app/core/services/utility.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    RouterModule,
    InputComponent,
    SelectComponent,
    ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscription$:Subscription = new Subscription();
  imageSrc!: string;
  loading!: boolean;
  formGroup!:FormGroup;
  userInfo!:any;
  genders = [
    { title: "Male", value:"male"},
    { title: "Female", value:"female"},
  ];

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _utilityService: UtilityService,
  ){}

  ngOnInit(): void {
    this.getUserInfo();
  }
  getUserInfo(){
    this._authService?.userInfo?.subscribe({
      next: (userInfo) =>{
        this.userInfo = userInfo;
        this.initForm();
      }
    })
  }

  getControl(controlName: string):any {
    return this.formGroup.controls[controlName];
  }

  initForm(){
    this.formGroup = this._fb.group({
      email:[this.userInfo?.email || '',[Validators.required, Validators.email]],
      phone:[this.userInfo?.phone || '',[Validators.required]],
      name:[this.userInfo?.name || '',[Validators.required]],
      age:[this.userInfo?.age || '',[Validators.required]],
      image:[''],
      password:['',(!this.userInfo?.password ? Validators.required : null)],
      gender:[this.userInfo?.gender || '',[Validators.required]],
      role:[this.userInfo?.role || '',[Validators.required]],
    })
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.formGroup?.controls['image']?.setValue(file);
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = (reader.result as string);
    reader.readAsDataURL(file);
  }

  submitForm(){
    if(this.formGroup?.valid){
      this.loading = true;
      if(!this.formGroup?.value?.password?.length){
        delete this.formGroup?.value?.password
      }
      if(!this.imageSrc && this.userInfo.image?.src){
        this.formGroup?.controls['image']?.setValue(JSON.stringify(this.userInfo.image));
      }
      this.subscription$.add(
        this._authService?.updateProfile(this._utilityService.prepareFormData(this.formGroup?.value))?.subscribe({
          next: (res:any) =>{
            this.loading = false;
            this._toastr.success("User updated successfully","Success");
            this._authService?.userInfo?.next(res);
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
