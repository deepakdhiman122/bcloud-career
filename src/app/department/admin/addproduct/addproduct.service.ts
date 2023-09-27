import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddproductService {
  updateUrl = "http://localhost:5000/product";
  // addProductURL = "http://localhost:5000/add-product";
  constructor(private httpclient: HttpClient) { }

  // saveproduct(jsondata: any) {
  //   const url = environment.apiBase + '/productcontroller/saveproduct';
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
  //   return this.httpclient.post<any>(url, jsondata, { headers: headers });
  // }

  getproduct() {
    const url = environment.apiBase + '/product';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.get<any>(url, { headers: headers });
  }

  // updateProductt(jsondata: any) {
  //   const url = environment.apiBase + '/product/:id';
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
  //   return this.httpclient.post<any>(url, jsondata, { headers: headers });
  // }

  onImageUpload(jsondata: any): Observable<any> {
    const url = environment.apiBase + '/imagecontroller/uplaodImage';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post(url, jsondata, { observe: 'response' });
  }

  deletePost(jsondata: any) {
    const url = environment.apiBase + '/product/:id';
    return this.httpclient.delete(url, jsondata);
  }

  // save employee service function

  saveproduct(jsondata: any) {
    const url = environment.apiBase + '/add-product';
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata);
  }

  // getproduct() {
  //   console.log("get product from service");
  //   return this.httpclient.get(this.getProductUrl);
  // }

  updateProductt(jsondata: any) {
    const url = environment.apiBase + '/product';
    return this.httpclient.put(url + '/' + jsondata.productid, jsondata);
  }
}