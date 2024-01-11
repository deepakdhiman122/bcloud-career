import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirConditionerService {

  constructor(private httpclient: HttpClient) { }
  getproduct() {
    const url = environment.apiBase + '/productcontroller/getservicelist';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
    return this.httpclient.post<any>(url, null, { headers: headers });
  }

  getProductsData() {
    return [
      {
        id: '1',
        name: 'ac repair',
        serviceproducttype: "Main Service",
        productrating: "4",
        salesprice: "299",
        basicclean: "199",
        servicetypes: "Main Service",
        imageurl: "../assets/ac-jet-service.jpg"
      },
      {
        id: '2',
        name: 'Refrigerator',
        serviceproducttype: "rapair",
        productrating: "4",
        salesprice: "299",
        basicclean: "199",
        servicetypes: "rapair",
        imageurl: "../assets/Refrigrator.png"
      },

      {
        id: '3',
        name: 'Washing Machine',
        serviceproducttype: "Installetion",
        productrating: "4",
        reapair: "199",
        servicetypes: "Installetion",
        imageurl: "../assets/Washing Machine.png"
      },
      {
        id: '4',
        name: 'Chimny Service and Repair',
        serviceproducttype: "Installetion",
        productrating: "4",
        basicclean: "499",
        instalation: "999",
        deepclean: "199",
        dismental: "399",
        repair: "199",
        servicetypes: "Installetion",
        imageurl: "../assets/Chimney.png"
      },
      {
        id: '4',
        name: 'Geyser Service',
        serviceproducttype: "Geyser Service",
        basicclean: "499",
        instalation: "999",
        deepclean: "199",
        dismental: "399",
        repair: "199",
        imageurl: "../assets/Geyser.png"
      },
      {
        id: '5',
        name: 'Led Tv',
        serviceproducttype: "led tv repair & service",
        serviceCharge: "199",
        instalation: "999",
        keybenefits1: "Key Benefits",
        imageurl: "../assets/television.png"
      },
      {
        id: '6',
        name: "led tv"
      }
    ];
  }

  getProducts() {
    return Promise.resolve(this.getProductsData());
  }
}
