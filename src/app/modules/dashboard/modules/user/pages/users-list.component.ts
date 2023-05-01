import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, map, Subscription } from 'rxjs';
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component';
import { UserService } from '../services/user.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  searchInput: FormControl = new FormControl(null);
  userInfo:any;
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
    {
      title: 'Role',
      colKey: 'role',
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
      icon: 'edit_note',
      label: 'edit',
      action: "EDIT",
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
    private _userService:UserService,
    private _authService:AuthService,
    private _router:Router,
    private _activatedRoute:ActivatedRoute,
    private _dialog:MatDialog,
    private _toastr:ToastrService,
    ){}

  ngOnInit(): void {
    this.onSearchChange();
    this.onQueryParamsChange();
    this.getUserInfo();
  }

  getUserInfo(){
    this._authService?.userInfo?.subscribe({
      next: (userInfo) =>{
        console.log("userInfo",userInfo)
        this.userInfo = userInfo;
      }
    })
  }

  listUsers(){
    this.loading = true;
    this.subscription$.add(
      this._userService
        .getList(this.filterCriteria)
        .pipe(
          map(({ data, ...remainData }:any) => ({
            data: this.formateUsersDate(data),
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

  onQueryParamsChange(){
    this._activatedRoute.queryParams?.subscribe(queryParams => {
      this.filterCriteria.name = queryParams['name'] || "";
      this.searchInput?.setValue(queryParams['name'] || "");
      this.listUsers();
    })
  }

  formateUsersDate(data: any[]) {
    return data?.map(({ role, ...user }) => ({
      role:role?.title?.en,
      ...user,
    }));
  }

  deleteField(id:number){
    this.loading = true;
    this.subscription$.add(
      this._userService
        .deleteUser(id)
        .subscribe({
          next: (res: any) => {
            this._toastr.success("User deleted successfully","Success");
            this.filterCriteria.page = 1;
            this.listUsers()
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

  public onPageChanged(event: { currentPage: number; pageSize: number }): void {
    let { currentPage, pageSize } = event;
    this.filterCriteria.page = this.dataSource.pagination.page = currentPage + 1;
    this.filterCriteria.limit = this.dataSource.pagination.limit = pageSize;
    this.listUsers();
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
