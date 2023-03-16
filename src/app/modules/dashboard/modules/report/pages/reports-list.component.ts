import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component';
import { ReportService } from '../../report/services/report.service';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit, OnDestroy{
  userRole!:string;
  columns = [
    {
      title: 'Patient',
      colKey: 'patient',
    },
    { title: 'Actions', colKey: 'actions' }
  ];
  allowedActions = [
    {
      icon: 'visibility',
      label: 'view',
      action: "VIEW",
      blockedRoles:[]
    },
    {
      icon: 'edit_note',
      label: 'edit',
      action: "EDIT",
      blockedRoles:['patient']
    },
    {
      icon: 'delete',
      label: 'delete',
      action: "DELETE",
      blockedRoles:['patient']
    },
  ];
  filterCriteria = {
    limit:10,
    patient:"",
    page:1
  }

  public subscription$: Subscription = new Subscription();

  loading:boolean = false;
  public dataSource: any = {
    columns: this.columns,
    columnsHeaders: this.columns.map((col) => col.colKey),
    data: [],
    ALLOWED_ACTIONS: this.allowedActions,
    pagination: {
      limit: this.filterCriteria?.limit,
      offset: this.filterCriteria?.page,
      totalPages: 0,
      totalElements: 0,
    },
  };
  constructor(
    private _reportService:ReportService,
    private _authService:AuthService,
    private _router:Router,
    private _activatedRoute:ActivatedRoute,
    private _dialog:MatDialog,
    private _toastr:ToastrService,
    ){}

  ngOnInit(): void {
    this.setRoleId();
    this.listReports();
    this.getUserRole();
  }

  getUserRole(){
    this.userRole = this._authService?.userRole;
    this.dataSource.ALLOWED_ACTIONS = (this.dataSource.ALLOWED_ACTIONS || [])?.filter((action:any) => !action?.blockedRoles?.length || !action?.blockedRoles?.includes(this.userRole))
  }
  setRoleId(){
    this.filterCriteria.patient = this._activatedRoute?.snapshot?.queryParams['patient'] || "";
  }
  listReports(){
    this.loading = true;
    this.subscription$.add(
      this._reportService
        .getList(this.filterCriteria)
        .pipe(
          map(({ data, ...remainData }:any) => ({
            data: this.formateReportsDate(data),
            ...remainData,
          }))
        )
        .subscribe({
          next: (res: any) => {
            let { data, totalCount } = res;
            this.dataSource.data = data;
            let totalPages = Math.ceil(parseInt(totalCount)/this.filterCriteria.limit);
            this.dataSource.pagination.totalElements = parseInt(totalCount);
            this.dataSource.pagination.totalPages = totalPages;
            this.loading = false;
          },
          error: (errors) => {
            this.loading = false;
          },
        })
    );
  }

  formateReportsDate(data: any[]) {
    return data?.map(({ patient, ...user }) => ({
      patient:patient?.name,
      ...user,
    }));
  }
  deleteField(id:number){
    this.loading = true;
    this.subscription$.add(
      this._reportService
        .deleteReport(id)
        .subscribe({
          next: (res: any) => {
            this._toastr.success("Report deleted successfully","Success");
            this.filterCriteria.page = 1;
            this.listReports()
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
          },
        })
    );
  }

  public onPageChanged(event: { currentPage: number; pageSize: number }): void {
    let { currentPage, pageSize } = event;
    this.filterCriteria.page = this.dataSource.pagination.page = currentPage + 1;
    this.filterCriteria.limit = this.dataSource.pagination.limit = pageSize;
    this.listReports();
  }
  public openDeleteFieldConfirmation(item: any): void {
    const dialogRef = this._dialog.open(ConfirmDeleteComponent);
    const SUB = dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.deleteField(item?._id);
        }
        SUB.unsubscribe();
      },
    });
  }

  public onRowAction(event: { item: any; ACTION_TYPE: string }): void {
    switch (event?.ACTION_TYPE) {
      case "EDIT":
        this._router.navigate([
          '../edit',
          event?.item?._id,
        ],{relativeTo: this._activatedRoute});
        break;
      case "VIEW":
        this._router.navigate([
          '../view',
          event?.item?._id,
        ],{relativeTo: this._activatedRoute});
        break;
      case "DELETE":
        this.openDeleteFieldConfirmation(event?.item);
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
