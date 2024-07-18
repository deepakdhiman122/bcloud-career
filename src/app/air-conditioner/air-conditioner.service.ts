import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirConditionerService {

  constructor(private httpclient: HttpClient) { }
  // getproduct() {
  //   const url = environment.apiBase + '/productcontroller/getservicelist';
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json;' });
  //   return this.httpclient.post<any>(url, null, { headers: headers });
  // }

  getProductsData() {
    return [
      {
        id: '1',
        name: 'Window AC Jet Service',
        coil: "Jet Cleaning to Remove dust from hidden area of cooling coil and condensor coil",
        Functioning: "Inspection the Unit to ensure Proper Functioning Post Services",
        // serviceproducttype: "Main Service",
        productrating: "4.9",
        salesprice: "399",
        basicclean: "399",
        servicetypes: "Main Service",
        imageurl: "../../assets/windowac.png",
        serviceproductcategory: "Air Conditioner",
        var: 'ac'

      },

      {
        id: '1',
        name: 'Split AC Jet Service',
        coil: "Jet Cleaning to Remove dust from hidden area of cooling coil and condensor coil",
        Functioning: "Inspection the Unit to ensure Proper Functioning Post Services",
        // serviceproducttype: "Main Service",
        productrating: "4.9",
        salesprice: "499",
        basicclean: "499",
        servicetypes: "Main Service",
        imageurl: "../../assets/ac-jet-service.jpg",
        serviceproductcategory: "Air Conditioner",
        var: 'ac'
      },


      {
        id: '1',
        name: 'Anti-Rust Coating Window / Split AC',
        coil: "Prevent Frequent Gas Leakages",
        Functioning: "Recommanded to be Used Post AC Service",
        // serviceproducttype: "Main Service",
        productrating: "4.9",
        salesprice: "350",
        basicclean: "350",
        servicetypes: "Main Service",
        imageurl: "../../assets/coatingac.png",
        serviceproductcategory: "Air Conditioner",
        var: 'ac'
      },

      {
        id: '2',
        name: 'Refrigerator Single Door / Double Door',
        serviceproducttype: "Repair Services",
        productrating: "4",
        salesprice: "199",
        // basicclean: "199",
        diagnose: 'Diagnose of the issue',
        warranty: '30 days labour and 90 days warranty on parts and gas ',
        // servicetypes: "Repair Services",
        imageurl: "../../assets/Refrigrator.png",
        serviceproductcategory: "Refrigerator",
        var: 'Refrigerator'
      },

      {
        id: '3',
        name: 'Washing Machine Top Load / Semi Automatic',
        serviceproducttype: "Repair / Installation",
        productrating: "4.8",
        reapair: "199",
        salesprice: "199",
        // repairandinstallation: 'Repair / Installation  ',
        diagnose: 'Diagnose of the issue',
        warranty: '30 days labour and 90 days warranty on parts',
        // servicetypes: "Repair / Installation seco",
        imageurl: "../../assets/Washing Machine.png",
        serviceproductcategory: "Washing Machine"
      },

      {
        id: '3',
        name: 'Washing Machine Front Load',
        serviceproducttype: "Repair / Installation",
        productrating: "4.8",
        reapair: "299",
        salesprice: "299",
        // repairandinstallation: 'Repair / Installation  ',
        diagnose: 'Diagnose of the issue',
        warranty: '30 days labour and 90 days warranty on parts',
        // servicetypes: "Repair / Installation seco",
        imageurl: "../../assets/Washing Machine.png",
        serviceproductcategory: "Washing Machine",
      },

      {
        id: '5',
        name: 'Led Tv Repair / Labour Charge / Service Charge / Installation up to 32" ',
        serviceproducttype: "led tv repair & service",
        salesprice: "249",
        instalation: "249",
        productrating: "4.8",
        diagnose: 'Diagnose of the issue',
        warranty: '30 days labour and 90 days warranty on parts',
        keybenefits1: "Key Benefits",
        imageurl: "../../assets/television.png",
        serviceproductcategory: "LED TV"
      },


      {
        id: '5',
        name: 'Led Tv Repair / Labour Charge / Service Charge / Installation up to 65" ',
        serviceproducttype: "led tv repair & service",
        salesprice: "349",
        instalation: "349",
        productrating: "4.8",
        diagnose: 'Diagnose of the issue',
        warranty: '30 days labour and 90 days warranty on parts',
        keybenefits1: "Key Benefits",
        imageurl: "../../assets/television.png",
        serviceproductcategory: "LED TV"
      },

      {
        id: '6',
        name: 'Microwave',
        serviceproducttype: "Labour / Visit Charge",
        salesprice: "199",
        instalation: "199",
        diagnosee: 'Diagnose of the issue',
        productrating: "4.8",
        warranty: '30 days labour and 90 days warranty on parts',
        Parts: 'Spare Part Rates Applicable as per rate card',
        keybenefits1: "Key Benefits",
        imageurl: "../../assets/6787-removebg-preview.png",
        serviceproductcategory: "Microwave"

      },

      {
        id: '6',
        name: 'Chimney',
        serviceproducttype: "Basic Cleaning / Installation",
        salesprice: "499",
        instalation: "499",
        productrating: "4.8",
        abcdchimney: 'Mesh and Basic Filter Cleaning Helps in Batter Suction',
        // keybenefits1: "Key Benefits",
        imageurl: "../../assets/Chimney.png",
        serviceproductcategory: "Chimney"
      },

      {
        id: '6',
        name: 'Chimney',
        serviceproducttype: "Deep Cleaning",
        abcdchimney: 'Inspection of All Part of Chimney',
        Dismentling: " Dismentling all Parts,Exterior and Interior Surface Degresing and Other Stands Rmovable Batter Air Flow In duct Pipes",
        Hydroxide: "Service by Sodium Hydroxide,Sodium Hydroxide is very safe for Product",
        productrating: "4.8",
        salesprice: "899",
        instalation: "899",
        keybenefits1: "Key Benefits",
        imageurl: "../../assets/Chimney.png",
        serviceproductcategory: "Chimney"
      },

      {
        id: '6',
        name: 'Geyser',
        serviceproducttype: "Repair / Labour / Service Charge / Installation",
        salesprice: "199",
        instalation: "199",
        diagnosee: 'Diagnose of the issue',
        productrating: "4.8",
        warranty: '30 days labour and 90 days warranty on parts',
        keybenefits1: "Key Benefits",
        imageurl: "../../assets/Geyser.png",
        serviceproductcategory: "Geyser"
      },

      {
        id: '6',
        name: 'Geyser',
        serviceproducttype: "Geyser Service Tank Cleaning",
        Perfect: "the Key Step In Geyser Servicing in the Removal of Scalling, Leading your Geyser as in Perfect Condition for Faster Heating and Electicity Savings ",
        salesprice: "350",
        productrating: "4.9",
        instalation: "350",
        keybenefits1: "Key Benefits",
        imageurl: "../../assets/Geyser.png",
        serviceproductcategory: "Geyser"
      },


      // installation data 

      {
        id: '1',
        name: 'Repair(Window/Split AC)-Labour/Visit Charges',
        coil: "Less/No Cooling",
        installationpart: "Diagnosis of the issue by Technician",
        labourWarranty: "30 Days Labour and 90-days warranty on Parts ",
        appliances: "Money Back Gaurantee ,if appliances is not repaired.",
        payafter: "Pay after Reapir.",
        separately: "Spare parts (if required) charged separately, to be decided after .",
        inspectionv: "inspection.",
        Skilled: "Skilled Technicians.",
        // serviceproducttype: "installation",
        productrating: "4.9",
        salesprice: "249",
        basicclean: "249",
        servicetypes: "installetion",
        imageurl: "../../assets/aclesss.jpg",
        serviceproductcategory: "Air Conditioner"
      },

      {
        id: '1',
        name: 'Repair(Window/Split AC)-Labour/Visit Charges',
        coil: "Water Leakage",
        installationpart: "Diagnosis of the issue by Technician",
        labourWarranty: "30 Days Labour and 90-days warranty on Parts ",
        appliances: "Money Back Gaurantee ,if appliances is not repaired.",
        payafter: "Pay after Reapir.",
        separately: "Spare parts (if required) charged separately, to be decided after .",
        inspectionv: "inspection.",
        Skilled: "Skilled Technicians.",
        // serviceproducttype: "installation",
        productrating: "4.9",
        salesprice: "249",
        basicclean: "249",
        servicetypes: "installetion",
        imageurl: "../../assets/ac-Water Leakage.jpg",
        serviceproductcategory: "Air Conditioner"
      },

      {
        id: '1',
        name: 'Repair(Window/Split AC)-Labour/Visit Charges',
        coil: "No Power",
        installationpart: "Diagnosis of the issue by Technician",
        labourWarranty: "30 Days Labour and 90-days warranty on Parts ",
        appliances: "Money Back Gaurantee ,if appliances is not repaired.",
        payafter: "Pay after Reapir.",
        separately: "Spare parts (if required) charged separately, to be decided after .",
        inspectionv: "inspection.",
        Skilled: "Skilled Technicians.",
        // serviceproducttype: "installation",
        productrating: "4.9",
        salesprice: "249",
        basicclean: "249",
        servicetypes: "installetion",
        imageurl: "../../assets/imagetesting/acNo Power.jpg",
        serviceproductcategory: "Air Conditioner"
      },

      {
        id: '1',
        name: 'Repair(Window/Split AC)-Labour/Visit Charges',
        coil: "Abnormal Noise",
        installationpart: "Diagnosis of the issue by Technician",
        labourWarranty: "30 Days Labour and 90-days warranty on Parts ",
        appliances: "Money Back Gaurantee ,if appliances is not repaired.",
        payafter: "Pay after Reapir.",
        separately: "Spare parts (if required) charged separately, to be decided after .",
        inspectionv: "inspection.",
        Skilled: "Skilled Technicians.",
        // serviceproducttype: "installation",
        productrating: "4.9",
        salesprice: "249",
        basicclean: "249",
        servicetypes: "installetion",
        imageurl: "../../assets/imagetesting/ac-Abnormal Noise.jpeg",
        serviceproductcategory: "Air Conditioner"
      },

      {
        id: '1',
        name: 'Gas Charging Window AC____ Leakage Repair and Gas Refill (Up to 90 days warranty',
        coil: "Abnormal Noise",
        installationpart: "Diagnosis of the issue by Technician",
        labourWarranty: "30 Days Labour and 90-days warranty on Gas ",
        appliances: "Money Back Gaurantee ,if appliances is not repaired.",
        payafter: "Pay after Reapir.",
        separately: "Spare parts (if required) charged separately, to be decided after .",
        inspectionv: "inspection.",
        Skilled: "Skilled Technicians.",
        // serviceproducttype: "installation",
        productrating: "4.9",
        salesprice: "2300",
        basicclean: "249",
        servicetypes: "installetion",
        imageurl: "../../assets/ac-gas-filling.jpeg",
        serviceproductcategory: "Air Conditioner"
      },


      {
        id: '1',
        name: 'Gas Charging Split AC____ Leakage Repair and Gas Refill (Up to 90 days warranty',
        coil: "Abnormal Noise",
        installationpart: "Diagnosis of the issue by Technician",
        labourWarranty: "30 Days Labour and 90-days warranty on Gas ",
        appliances: "Money Back Gaurantee ,if appliances is not repaired.",
        payafter: "Pay after Reapir.",
        separately: "Spare parts (if required) charged separately, to be decided after .",
        inspectionv: "inspection.",
        Skilled: "Skilled Technicians.",
        // serviceproducttype: "installation",
        productrating: "4.9",
        salesprice: "2500",
        basicclean: "249",
        servicetypes: "installetion",
        imageurl: "../../assets/ac-gas-filling.jpeg",
        serviceproductcategory: "Air Conditioner"
      },

      {
        id: '1',
        name: 'Window Ac Uninstallation',
        // coil: "Window Ac Uninstallation",
        installationpart: "Includes free drilling , Wiring Connections   :gas checking and functioning of AC. ",
        labourWarranty: "Includes uninstallation for your AC unit",
        appliances: "Includes-- free drilling , Wiring Connections ,Pipe fixing ,gas checking and functioning of AC",
        payafter: "Excluded -Copper Wires  &Pipes charged as per rate card. : Stand and fastener for fixing stand",
        productrating: "4.9",
        salesprice: "249",
        basicclean: "249",
        servicetypes: "installetion",
        imageurl: "../../assets/wondowac.jfif",
        serviceproductcategory: "Air Conditioner"
      },

      {
        id: '1',
        name: 'Window Ac Installation',
        // coil: "Window Ac Uninstallation",
        installationpart: "Includes free drilling , Wiring Connections   :gas checking and functioning of AC. ",
        labourWarranty: "Includes uninstallation for your AC unit",
        appliances: "Includes-- free drilling , Wiring Connections ,Pipe fixing ,gas checking and functioning of AC",
        payafter: "Excluded -Copper Wires  &Pipes charged as per rate card. : Stand and fastener for fixing stand",
        productrating: "4.9",
        salesprice: "499",
        basicclean: "499",
        servicetypes: "installetion",
        imageurl: "../../assets/wondowac.jfif",
        serviceproductcategory: "Air Conditioner"
      },

      {
        id: '1',
        name: 'Split Ac Uninstallation',
        // coil: "Window Ac Uninstallation",
        installationpart: "Includes free drilling , Wiring Connections   :gas checking and functioning of AC. ",
        labourWarranty: "Includes uninstallation for your AC unit",
        appliances: "Includes-- free drilling , Wiring Connections ,Pipe fixing ,gas checking and functioning of AC",
        payafter: "Excluded -Copper Wires  &Pipes charged as per rate card. : Stand and fastener for fixing stand",
        productrating: "4.9",
        salesprice: "499",
        basicclean: "499",
        servicetypes: "installetion",
        imageurl: "../../assets/splitacinstalllation.jfif",
        serviceproductcategory: "Air Conditioner"
      },

      {
        id: '1',
        name: 'Split Ac Installation',
        // coil: "Window Ac Uninstallation",
        installationpart: "Includes free drilling , Wiring Connections   :gas checking and functioning of AC. ",
        labourWarranty: "Includes uninstallation for your AC unit",
        appliances: "Includes-- free drilling , Wiring Connections ,Pipe fixing ,gas checking and functioning of AC",
        payafter: "Excluded -Copper Wires  &Pipes charged as per rate card. : Stand and fastener for fixing stand",
        productrating: "4.9",
        salesprice: "1199",
        basicclean: "1199",
        servicetypes: "installetion",
        imageurl: "../../assets/splitacinstalllation.jfif",
        serviceproductcategory: "Air Conditioner"
      },


    ];
  }

  getproduct() {
    return Promise.resolve(this.getProductsData());
  }
}
