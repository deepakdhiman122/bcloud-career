import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PopviewService {

  constructor(private httpclient: HttpClient) { }
  getorderlist(jsondata: any) {
    const url = environment.apiBase + '/ordercontroller/getorderdetails';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata, { headers: headers });
  }

  onImageUpload(jsondata: any): Observable<any> {
    const url = environment.apiBase + '/imagecontroller/uplaodImage';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post(url, jsondata, { observe: 'response' });
  }

  save(jsondata: any) {
    const url = environment.apiBase + '/api/updateorderstatus';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata, { headers: headers });
  }
}