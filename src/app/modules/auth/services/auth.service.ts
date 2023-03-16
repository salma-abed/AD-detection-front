import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo:ReplaySubject<any> = new ReplaySubject(1);
  userRole!:string;
  constructor(
    private _httpClient:HttpClient,
    private _router:Router,

    ) { }

  isLogin(){
    return localStorage?.getItem("token");
  }

  logout(){
    localStorage?.removeItem("token");
    this.userInfo.next(null);
    this.userRole = "";
    this._router.navigate(['/landing/home']);
  }

  login(body:any){
    return this._httpClient.post(`${environment.apiUrl}user/auth/login`,body);
  }

  profile(){
    return this._httpClient.get(`${environment.apiUrl}user/auth/profile`);
  }

  updateProfile(body:any){
    return this._httpClient.put(`${environment.apiUrl}user/auth/edit-profile`,body);
  }

  getRoles(params?:any){
    return this._httpClient.get(`${environment.apiUrl}role`,{params})
  }

  signup(body:any){
    return this._httpClient.post(`${environment.apiUrl}user/auth/register`,body)
  }
}
