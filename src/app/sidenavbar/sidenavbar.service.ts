import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SidenavbarService {

  constructor(private httpclient: HttpClient) { }

  getnavdata(jsonbody: any): Observable<any> {
    const url = environment.apiBase + '/navcontroller/getnavdetails';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsonbody,{headers: headers});
  }

  getAdminDashboardData(jsonbody: any): Observable<any> {
    const url = environment.apiBase + '/ordercontroller/getadmindashboarddata';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsonbody,{headers: headers});
  }

  saveCoinManagement(jsonbody: any): Observable<any> {
    const url = environment.apiBase + '/logincontroller/savecoinmanagement';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsonbody,{headers: headers});
  }

  saveCouponDetails(jsonbody: any): Observable<any> {
    const url = environment.apiBase + '/employeecontroller/savecouponcode';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsonbody,{headers: headers});
  }

  save(jsonbody: any): Observable<any> {
    const url = environment.apiBase + '/employeecontroller/saveannouncement';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsonbody,{headers: headers});
  }
}