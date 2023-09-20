import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  signUpurl = "http://localhost:5000/register-user";
  loginUrl = "http://localhost:5000/login-user";
  constructor(private http: HttpClient) { }
  
  // validateLogin(jsonbody: any): Observable<any> {
  //   const url= environment.apiBase + "/logincontroller/validatelogin";
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
  //   return this.http.post<any>(url, jsonbody, {headers: headers});
  // }

  // registration(jsonbody:any): Observable<any>{
  //   const url= environment.apiBase + "/logincontroller/savecustomer";
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
  //   return this.http.post<any>(url, jsonbody, {headers: headers});
  // }

  // getUserDetails(jsondata: any) {
  //   const url = environment.apiBase + '/logincontroller/getuserdetails';
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
  //   return this.http.post<any>(url, jsondata, { headers: headers });
  // }

// beginn: signUp service function  
  signUpPost(data:any) {
    return this.http.post(this.signUpurl,data);
  }

  // beginn: login service function
  loginPost(data:any){
    return this.http.post(this.loginUrl,data);
  }
}