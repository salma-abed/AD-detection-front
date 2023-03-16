import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/app/core/services/utility.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent {
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
  }

  submit(formGroup:FormGroup){
    if(formGroup?.valid){
      this.loading = true;
      this.subscription$.add(
        this._reportService?.createReport(this._utilityService.prepareFormData(formGroup?.value))?.subscribe({
          next: (res:any) =>{
            this._toastr.success("Report created successfully","Success");
            this._router.navigate(['../list'],{relativeTo:this._activatedRoute});
            this.loading = false;
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
