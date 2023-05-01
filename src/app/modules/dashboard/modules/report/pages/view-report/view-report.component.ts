import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { ReportService } from '../../services/report.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent {
  reportInfo!:any;
  public subscription$: Subscription = new Subscription();
  commentControl: FormControl = new FormControl('',Validators.required);
  commentLoading: boolean = false;

  constructor(
    private _reportService:ReportService,
    private _activatedRoute:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getReportById();
  }

  getReportById(){
    this.subscription$.add(
      this._reportService?.getReportById(this._activatedRoute?.snapshot?.params['id'])?.subscribe({
        next: (res) =>{
          this.reportInfo = res;
        }
      })
    )
  }

  addComment(){
    if(this.commentControl.valid){
      this.commentLoading = true;
      this.subscription$.add(
        this._reportService
        ?.addComment(this._activatedRoute?.snapshot?.params['id'],this.commentControl?.value)
        ?.pipe(finalize(() => this.commentLoading = false))
        ?.subscribe({
          next: (res: any) =>{
            this.reportInfo.comments = res?.comments;
          }
        })
      )
    }
  }
}
