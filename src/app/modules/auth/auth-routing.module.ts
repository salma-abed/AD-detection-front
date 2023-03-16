import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'', component: AuthComponent, children:[
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'signup',
      component: SignupComponent
    },
    {
      path: 'forget',
      component: ForgetPasswordComponent
    },
    {
      path: 'change-pass',
      component: ChangePasswordComponent
    },
    {
      path: 'reset-pass',
      component: ResetPasswordComponent
    },
  ]}
  // { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
