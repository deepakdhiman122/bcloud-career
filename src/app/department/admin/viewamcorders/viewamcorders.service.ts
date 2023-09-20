import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewamcordersService {

  constructor(private httpclient: HttpClient) { }

  getServicesOrder() {
    const url = environment.apiBase + '/ordercontroller/getamcorder';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, null, { headers: headers });
  }

  getAMCorderDetails(jsondata: any) {
    const url = environment.apiBase + '/productcontroller/getamcwiseservicelist';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata, { headers: headers });
  }

  printAMCOrder(jsondata : any): Observable<Blob> {
    const url = environment.apiBase + '/ordercontroller/printamcorder';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post(url, jsondata, {headers: headers, responseType: 'blob' });
  }
  
  getEmployeeList() {
    const url = environment.apiBase + '/employeecontroller/getemployeelist';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, null, { headers: headers });
  }

  assignOrderTO(jsondata: any) {
    const url = environment.apiBase + '/ordercontroller/updateamcorder';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata, { headers: headers });
  }
}