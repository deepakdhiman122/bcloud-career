import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private httpclient: HttpClient) { }
  getproduct() {
    const url = environment.apiBase + '/productcontroller/getproductlist';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, null, { headers: headers });
  }
}
