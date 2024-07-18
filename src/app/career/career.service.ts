import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private http: HttpClient) { }


  careePost(jsonbody: any) {
    const url = environment.apiBase + '/api/careerDataPost';

    return this.http.post<any>(url, jsonbody);
  }

  getCareer() {
    const url = environment.apiBase + '/api/getCareerData';
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.http.get<any>(url);
  }


}
