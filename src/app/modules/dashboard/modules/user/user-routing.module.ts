import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { UsersListComponent } from './pages/users-list.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';

const routes: Routes = [
  { path: '', redirectTo:'list', pathMatch: 'full'},
  { path: 'list', component: UsersListComponent},
  { path: 'create', component: CreateUserComponent},
  { path: 'edit/:id', component: EditUserComponent},
  { path: 'view/:id', component: ViewUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
