import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Subscription } from 'rxjs/internal/Subscription';
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component';
import { UserService } from '../../user/services/user.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit, OnDestroy {
  searchInput: FormControl = new FormControl(null);

  columns = [
    {
      title: 'Name',
      colKey: 'name',
    },
    {
      title: 'Phone Number',
      colKey: 'phone',
    },
    {
      title: 'Email',
      colKey: 'email',
    },
    {
      title: 'Gender',
      colKey: 'gender',
    },
    {
      title: 'Age',
      colKey: 'age',
    },
    { title: 'Actions', colKey: 'actions' }
  ];
  allowedActions = [
    {
      icon: 'visibility',
      label: 'view',
      action: "VIEW",
    },
    {
      icon: 'delete',
      label: 'delete',
      action: "DELETE",
    },
  ];
  filterCriteria = {
    limit:10,
    page:1,
    name:""
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
    private _patientService:PatientService,
    private _router:Router,
    private _activatedRoute:ActivatedRoute,
    private _dialog:MatDialog,
    private _toastr:ToastrService,
    ){}

  ngOnInit(): void {
    this.onSearchChange();
    this.onQueryParamsChange();
  }

  listPatients(){
    this.loading = true;
    this.subscription$.add(
      this._patientService
        .getList(this.filterCriteria)
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

  onQueryParamsChange(){
    this._activatedRoute.queryParams?.subscribe(queryParams => {
      this.filterCriteria.name = queryParams['name'] || "";
      this.searchInput?.setValue(queryParams['name'] || "");
      this.listPatients();
    })
  }

  deleteField(id:number){
    this.loading = true;
    this.subscription$.add(
      this._patientService
        .deletePatient(id)
        .subscribe({
          next: (res: any) => {
            this._toastr.success("User deleted successfully","Success");
            this.filterCriteria.page = 1;
            this.listPatients()
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
    this.listPatients();
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
      case "VIEW":
        this._router.navigate([
          '../../report/list'
        ],{
          relativeTo: this._activatedRoute,queryParams:{
            patient:event?.item?._id,
        }});
        break;
      case "DELETE":
        this.openDeleteFieldConfirmation(event?.item);
        break;
    }
  }

  onSearchChange(): void {
    this.searchInput.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.filterCriteria.name = value;
        this.filterCriteria.page = 1;
        this._router.navigate(['./'],{
          relativeTo:this._activatedRoute,
          queryParams:this.filterCriteria
        });
      });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
