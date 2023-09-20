import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  constructor(private httpclient: HttpClient) { }
  getawslist() {
    const url = environment.apiBase + '/productcontroller/getamcservicelist';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, null, { headers: headers });
  }

  saveAMCorder(jsondata: any) {
    const url = environment.apiBase + '/ordercontroller/saveamcorder';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata, { headers: headers });
  }

  printAMCOrder(jsondata : any): Observable<Blob> {
    const url = environment.apiBase + '/ordercontroller/printamcorder';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post(url, jsondata, {headers: headers, responseType: 'blob' });
  }
}