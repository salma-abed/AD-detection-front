import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent {
  reportInfo!:any;
  public subscription$: Subscription = new Subscription();
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
}
