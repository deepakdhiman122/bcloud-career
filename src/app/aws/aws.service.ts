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
        amcheading: 'ac repair',
        amcname: 'amc name',
        amcprice: "299",
        subtotal: '499',
        amccovers: 'amc cover',
        servicetypes: "Main Service",
        // imageurl: "../assets/imagetesting/1.jpeg",
        imageurl: "../../assets/Air Conditioner.png",
        serviceproductcategory: "Air Conditioner"
      },

      {
        id: '2',
        name: 'Refrigerator',
        serviceproducttype: "Repair Services",
        productrating: "4",
        salesprice: "299",
        basicclean: "199",
        // servicetypes: "Repair Services",
        imageurl: "../../assets/Refrigrator.png",
        serviceproductcategory: "Refrigerator"
      },

      {
        id: '3',
        name: 'Washing Machine',
        serviceproducttype: "Installetion",
        productrating: "4",
        reapair: "199",
        servicetypes: "Installetion",
        imageurl: "../../assets/Washing Machine.png",
        serviceproductcategory: "Washing Machine"
      },

      {
        id: '5',
        name: 'Led Tv',
        serviceproducttype: "led tv repair & service",
        serviceCharge: "199",
        instalation: "999",
        keybenefits1: "Key Benefits",
        imageurl: "../../assets/television.png",
        serviceproductcategory: "LED TV"
      },

      {
        id: '6',
        name: 'Microwave',
        serviceproducttype: "led tv repair & service",
        serviceCharge: "199",
        instalation: "999",
        keybenefits1: "Key Benefits",
        imageurl: "../../assets/6787-removebg-preview.png",
        serviceproductcategory: "Microwave"

      },

      {
        id: '6',
        name: 'Chimney',
        serviceproducttype: "led tv repair & service",
        serviceCharge: "199",
        instalation: "999",
        keybenefits1: "Key Benefits",
        imageurl: "../../assets/Chimney.png",
        serviceproductcategory: "Chimney"
      },

      {
        id: '6',
        name: 'Geyser',
        serviceproducttype: "led tv repair & service",
        serviceCharge: "199",
        instalation: "999",
        keybenefits1: "Key Benefits",
        imageurl: "../../assets/Geyser.png",
        serviceproductcategory: "Geyser"
      },

      {
        id: '6',
        name: 'Air Cooler',
        serviceproducttype: "led tv repair & service",
        serviceCharge: "199",
        instalation: "999",
        keybenefits1: "Key Benefits",
        imageurl: "../../assets/Air Cooler.png",
        serviceproductcategory: "Air Cooler"
      },

      // {
      //   id: '7',
      //   name: 'ac repair',
      //   serviceCharge: '499',
      //   servicetypes: "Installetion",
      //   imageurl: "../../assets/Air Conditioner.png",
      //   serviceproductcategory: "Air Conditioner"
      // },

      // {
      //   id: '8',
      //   name: 'window ac uninstallation',
      //   serviceCharge: '249',
      //   servicetypes: "Installetion",
      // },

      // {
      //   id: '9',
      //   name: 'Split Ac Uninstallation',
      //   serviceCharge: '499',
      //   servicetypes: "Installetion",
      // },

      // {
      //   id: '9',
      //   name: 'Split Ac Installation',
      //   serviceCharge: '1199',
      //   servicetypes: "Installetion",
      // },

    ];
  }

  getProducts() {
    return Promise.resolve(this.getProductsData());
  }
}