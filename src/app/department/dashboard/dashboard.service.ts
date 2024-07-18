import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  registration(jsonbody: any) {
    const url = environment.apiBase + '/api/careerPost';
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.http.post<any>(url, jsonbody);
  }
}
