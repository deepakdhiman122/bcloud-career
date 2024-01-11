import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  constructor(private httpclient: HttpClient) { }
  getawslist() {
    const url = environment.apiBase + '/productcontroller/getamcservicelist';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, null, { headers: headers });
  }

  saveAMCorder(jsondata: any) {
    const url = environment.apiBase + '/ordercontroller/saveamcorder';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, jsondata, { headers: headers });
  }

  printAMCOrder(jsondata: any): Observable<Blob> {
    const url = environment.apiBase + '/ordercontroller/printamcorder';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post(url, jsondata, { headers: headers, responseType: 'blob' });
  }


  getProductsData() {
    return [
      {
        id: '1',
        amcheading: 'Ac Services and Repair',
        amcname: "Installation & Uninstallation",
        amcprice: "299",
        subtotal: "500",
        serviceCharge: "199",
        amccovers: "Amc Cover",
        keybenefits1: "Key Benefits",
        imageurl: "../assets/ac-jet-service.jpg"
      },
      {
        id: '2',
        amcheading: 'Amc Heading',
        amcname: "Amc Name",
        amcprice: "299",
        serviceCharge: "199",
        subtotal: "500",
        amccovers: "Amc Cover",
        keybenefits1: "Key Benefits",
        imageurl: "../assets/Air Conditioner.png"
      },
      {
        id: '3',
        amcheading: 'Microwave',
        amcname: "Amc Name",
        amcprice: "299",
        subtotal: "500",
        serviceCharge: "199",
        amccovers: "Amc Cover",
        keybenefits1: "Key Benefits",
        imageurl: "../assets/microwave.webp"
      },
      {
        id: '4',
        amcheading: 'Geyser Service',
        amcname: "Amc Name",
        amcprice: "299",
        serviceCharge: "199",
        subtotal: "500",
        amccovers: "Amc Cover",
        keybenefits1: "Key Benefits",
        imageurl: "../assets/Geyser.png"
      },
      {
        id: '5',
        amcheading: 'Washing Machine Service',
        amcname: "Washing Machine Service and repair",
        serviceCharge: "199",
        amccovers: "Amc Cover",
        keybenefits1: "Key Benefits",
        imageurl: "../assets/Washing Machine.png"
      },
      {
        id: '6',
        amcheading: 'Refrigerator',
        amcname: "Refrigerator repair",
        serviceCharge: "199",
        keybenefits1: "Key Benefits",
        imageurl: "../assets/Refrigrator.png"
      },
      {
        id: '7',
        amcheading: 'Led Tv',
        amcname: "led tv repair",
        serviceCharge: "199",
        keybenefits1: "Key Benefits",
        imageurl: "../assets/television.png"
      }
    ];
  }

  getProducts() {
    return Promise.resolve(this.getProductsData());
  }
}