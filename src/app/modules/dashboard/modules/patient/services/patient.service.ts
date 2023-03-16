import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { patients } from '../constants/dummy-data.constants';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private _httpClient:HttpClient) { }

  createPatient(body:any){
    return this._httpClient.post(`${environment.apiUrl}user`,body);
  }

  getList(params:any){
    params.patient = "patient";
    return this._httpClient.get(`${environment.apiUrl}user`,{params});
  }

  getPatientById(id:number){
    return this._httpClient.get(`${environment.apiUrl}user/${id}`);
  }

  deletePatient(id:number){
    return this._httpClient.delete(`${environment.apiUrl}user/${id}`);
  }

}
