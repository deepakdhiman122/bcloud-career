import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpclient: HttpClient) { }
  getproduct() {
    const url = environment.apiBase + '/productcontroller/getproductlist';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, null, { headers: headers });
  }
  getservices() {
    const url = environment.apiBase + '/productcontroller/getservicelist';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, null, { headers: headers });
  }
  getreviwe(jsondata:any) {
    const url = environment.apiBase + '/logincontroller/getuserfeedback';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata, { headers: headers });
  }
}
