import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private httpclient: HttpClient) { }
  getannoucementlist() {
    const url = environment.apiBase + '/employeecontroller/getannouncement';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, null, { headers: headers });
  }

  getawslist() {
    const url = environment.apiBase + '/productcontroller/getamcservicelist';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, null, { headers: headers });
  }
}
