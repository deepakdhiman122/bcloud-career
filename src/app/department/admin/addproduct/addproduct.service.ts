import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddproductService {

  constructor(private httpclient: HttpClient) { }

  saveproduct(jsondata: any) {
    const url = environment.apiBase + '/productcontroller/saveproduct';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata, { headers: headers });
  }

  getproduct() {
    const url = environment.apiBase + '/productcontroller/getproductlist';
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