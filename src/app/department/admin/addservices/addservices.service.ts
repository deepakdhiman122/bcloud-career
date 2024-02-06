import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddservicesService {

  constructor(private httpclient: HttpClient) { }

  getservicelist() {
    const url = environment.apiBase + '/api/get_service';
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.get<any>(url);
  }

  saveServices(jsondata: any) {
    const url = environment.apiBase + '/api/addService';
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata,);
  }

  updateProduct(jsondata: any) {
    const url = environment.apiBase + '/productcontroller/updateservices';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata, { headers: headers });
  }

  onImageUpload(jsondata: any): Observable<any> {
    const url = environment.apiBase + '/imagecontroller/uplaodImage';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata, { headers: headers, observe: 'response' });
  }
}