import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UsersListComponent } from './pages/users-list.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { CustomTableComponent } from 'src/app/shared/components/custom-table/custom-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from 'src/app/shared/components/form-field/input/input.component';
import { SelectComponent } from 'src/app/shared/components/form-field/select/select.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    UsersListComponent,
    EditUserComponent,
    ViewUserComponent,
    CreateUserComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CustomTableComponent,
    MatDialogModule,
    MatIconModule,
    InputComponent,
    SelectComponent,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule
  ]
})
export default class UserModule { }
