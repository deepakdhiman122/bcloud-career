import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserdashboardService {

  constructor(private httpclient: HttpClient) { }

  getUserDetails(jsondata: any) {
    const url = environment.apiBase + '/logincontroller/getuserdetails';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata, { headers: headers });
  }

  getCustomerOrderDetails(jsondata: any) {
    const url = environment.apiBase + '/ordercontroller/getcustomerorderdetails';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata, { headers: headers });
  }

  save(jsondata: any) {
    const url = environment.apiBase + '/logincontroller/updatefeedback';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata, { headers: headers });
  }
}