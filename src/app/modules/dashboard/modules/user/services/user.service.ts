import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { users } from '../constants/dummy-data.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient:HttpClient) { }


  createUser(body:any){
    return this._httpClient.post(`${environment.apiUrl}user`,body);
  }

  getList(params:any){
    return this._httpClient.get(`${environment.apiUrl}user`,{params});
  }

  getUserById(id:number){
    return this._httpClient.get(`${environment.apiUrl}user/${id}`);
  }


  updateUserById(id:number,body:any){
    return this._httpClient.put(`${environment.apiUrl}user/${id}`,body);
  }

  deleteUser(id:number){
    return this._httpClient.delete(`${environment.apiUrl}user/${id}`);
  }

}
