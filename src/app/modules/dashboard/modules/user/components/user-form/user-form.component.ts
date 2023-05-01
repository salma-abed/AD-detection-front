import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { passwordValidator } from 'src/app/core/validations/confirm-password.validation';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy, OnChanges {
  subscription$:Subscription = new Subscription();

  @Input() data:any;
  @Input() loading:boolean = false;
  @Output() submit: EventEmitter<FormGroup> = new EventEmitter();

  userInfo!:any;
  roles = [];
  doctors = []
  genders = [
    { title: "Male", value:"male"},
    { title: "Female", value:"female"},
  ];

  formGroup!:FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _userService: UserService,
  ){}

  ngOnInit(): void {
    this.getUserInfo();
    this.initForm();
    this.getRoles();
  }

  getControl(controlName: string):any {
    return this.formGroup.controls[controlName];
  }
  getUserInfo(){
    this._authService?.userInfo?.subscribe({
      next: (userInfo) =>{
        console.log("userInfo",userInfo)
        this.userInfo = userInfo;
      }
    })
  }
  getRoles(){
    this.subscription$.add(
      this._authService.getRoles({
        app:"frontend-app",
        select: "title _id type"
      })?.subscribe({
        next: (res:any) =>{
          this.roles = res?.data?.map( (role:any) =>{
            return {
              title: role?.title?.en,
              value: role?._id,
              type: role?.type
            }
          });
          let doctorRole = (this.roles?.find((role:any) => role?.type == 'doctor') as any)?.value;
          if(doctorRole && this.userInfo?.role?.type != 'doctor'){
            this.getDoctors(doctorRole);
          }
        }
      })
    )
  }

  getDoctors(role:string){
    this._userService?.getList({role:role})?.subscribe({
      next: (res:any) => {
        this.doctors = res?.data;
      }
    })
  }

  initForm(){
    this.formGroup = this._fb.group({
      email:[this.data?.email || '',[Validators.required, Validators.email]],
      phone:[this.data?.phone || '',[Validators.required]],
      name:[this.data?.name || '',[Validators.required]],
      age:[this.data?.age || '',[Validators.required]],
      password:['',(!this.data?.password ? [Validators.required, passwordValidator] : null)],
      gender:[this.data?.gender || '',[Validators.required]],
      role:[this.data?.role || '',[Validators.required]],
      doctor:[this.data?.doctor?._id || ''],
    })
  }

  submitForm(){
    if(this.formGroup?.valid){
      this.submit.emit(this.formGroup);
    }
  }

  ngOnChanges(simpleChanges:SimpleChanges): void {
    let dataCurrentValue = simpleChanges['data']?.currentValue;
    if(dataCurrentValue){
      this.data.role = dataCurrentValue?.role?._id
      this.initForm();
    }
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
