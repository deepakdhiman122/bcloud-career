import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeedashboardService {

  constructor(private httpclient: HttpClient) { }

  getemployeeDashboardData(jsonbody: any): Observable<any> {
    const url = environment.apiBase + '/ordercontroller/getemployeedashboarddata';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsonbody,{headers: headers});
  }

  saveCoinManagement(jsonbody: any): Observable<any> {
    const url = environment.apiBase + '/logincontroller/savecoinmanagement';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsonbody,{headers: headers});
  }

  getServicesOrder(jsondata: any) {
    const url = environment.apiBase + '/ordercontroller/getempservicesorder';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata, { headers: headers });
  }
}