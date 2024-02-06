import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // signUpurl = "http://localhost:5000/register-user";
  // loginUrl = "http://localhost:5000/login-user";

  constructor(private http: HttpClient) { }

  // validateLogin(jsonbody: any): Observable<any> {
  //   const url = environment.apiBase + "/logincontroller/validatelogin";
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
  //   return this.http.post<any>(url, jsonbody, { headers: headers });
  // }

  // registration(jsonbody: any) {
  //   console.log("jsonbody//////", jsonbody);
  //   const url = environment.apiBase + "/register-user";
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
  //   return this.http.post<any>(url, jsonbody, { headers: headers });
  // }

  // getUserDetails(jsondata: any) {
  //   const url = environment.apiBase + '/logincontroller/getuserdetails';
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
  //   return this.http.post<any>(url, jsondata, { headers: headers });
  // }

  // beginn: signUp service function  

  registration(jsonbody: any) {
    const url = environment.apiBase + '/api/register';
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.http.post<any>(url, jsonbody);
  }

  // beginn: login service function

  validateLogin(jsonbody: any): Observable<any> {
    const url = environment.apiBase + '/api/login';
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.http.post<any>(url, jsonbody);
  }
}

// testforlogin2@gmail.com