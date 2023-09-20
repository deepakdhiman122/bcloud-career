import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewproductordersService {

  constructor(private httpclient: HttpClient) { }

  getProductOrder() {
    const url = environment.apiBase + '/ordercontroller/getproductorder';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, null, { headers: headers });
  }

  getEmployeeList() {
    const url = environment.apiBase + '/employeecontroller/getemployeelist';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, null, { headers: headers });
  }

  assignOrderTO(jsondata: any) {
    const url = environment.apiBase + '/ordercontroller/assignorderto';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata, { headers: headers });
  }
}