import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewserviceordersService {

  constructor(private httpclient: HttpClient) { }

  getServicesOrder() {
    const url = environment.apiBase + '/api/getgenerateorder';
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.get<any>(url,);
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