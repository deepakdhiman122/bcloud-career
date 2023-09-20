import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManualordergenerationService {

  constructor(private httpclient: HttpClient) { }

  saveproduct(jsondata: any) {
    const url = environment.apiBase + '/ordercontroller/generatemanualorder';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata, { headers: headers });
  }

  getproduct() {
    const url = environment.apiBase + '/productcontroller/getservicelist';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, null, { headers: headers });
  }

  updateProduct(jsondata: any) {
    const url = environment.apiBase + '/productcontroller/updateproduct';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata, { headers: headers });
  }

  onImageUpload(jsondata: any): Observable<any> {
    const url = environment.apiBase + '/imagecontroller/uplaodImage';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post(url, jsondata, { observe: 'response' });
  }
}
