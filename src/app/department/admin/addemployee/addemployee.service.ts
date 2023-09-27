import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddemployeeService {

  // addEmployeeUrl = "http://localhost:5000/register-user";
  constructor(private httpclient: HttpClient) { }

  saveEmployee(jsondata: any) {
    const url = environment.apiBase + '/register-user';
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata);
  }

  getEmployeeList() {
    const url = environment.apiBase + '/user';
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.get<any>(url);
  }

  updateProduct(jsondata: any) {
    const url = environment.apiBase + '/user';
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.put(url + '/' + jsondata.employeeid, jsondata);
  }

  onImageUpload(jsondata: any): Observable<any> {
    const url = environment.apiBase + '/imagecontroller/uplaodImage';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata, { headers: headers, observe: 'response' });
  }


  // save employee service function

  // saveEmployee(data: any) {
  //   console.log("data", data);
  //   return this.httpclient.post(this.addEmployeeUrl, data);
  // }
}