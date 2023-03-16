import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/app/core/services/utility.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent implements OnInit, OnDestroy{
  data:any;
  public subscription$: Subscription = new Subscription();
  loading:boolean = false;
  constructor(
    private _reportService:ReportService,
    private _router:Router,
    private _activatedRoute:ActivatedRoute,
    private _toastr:ToastrService,
    private _utilityService:UtilityService,
    ){}

  ngOnInit(): void {
    this.getReportById();
  }


  getReportById(){
    this.subscription$.add(
      this._reportService?.getReportById(this._activatedRoute?.snapshot?.params['id'])?.subscribe({
        next: (res) =>{
          this.data = res;
        }
      })
    )
  }

  submit(formGroup:FormGroup){
    if(formGroup.valid){
      console.log("formGroup",formGroup)
      this.loading = true;
      this.subscription$.add(
        this._reportService?.updateReportById(this._activatedRoute?.snapshot?.params['id'],this._utilityService.prepareFormData(formGroup?.value))?.subscribe({
          next: (res:any) =>{
            this.loading = false;
            this._toastr.success("Report updated successfully","Success");
            this._router.navigate(['../../list'],{relativeTo:this._activatedRoute});
          },
          error: (error:any) => {
            let serverErrors = error?.error?.message;
            if(typeof serverErrors == "string"){
              this._toastr.error(serverErrors,"Error")
            } else if (typeof serverErrors == "object") {
              this._toastr.error(Object.values(serverErrors as any)?.join(","),"Error")
            }
            this.loading = false;
          }
        })
      )
    }
  }

  ngOnDestroy(){
    this.subscription$?.unsubscribe();
  }
}
