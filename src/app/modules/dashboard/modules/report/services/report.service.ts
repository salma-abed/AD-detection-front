import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { reports } from '../constants/dummy-data.constants';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private _httpClient:HttpClient) { }

  createReport(body:any){
    return this._httpClient.post(`${environment.apiUrl}report`,body);
  }

  getList(params:any){
    return this._httpClient.get(`${environment.apiUrl}report`,{params});
  }

  getReportById(id:number){
    return this._httpClient.get(`${environment.apiUrl}report/${id}`);
  }

  updateReportById(id:number,body:any){
    return this._httpClient.put(`${environment.apiUrl}report/${id}`,body);
  }

  deleteReport(id:number){
    return this._httpClient.delete(`${environment.apiUrl}report/${id}`);
  }

}
