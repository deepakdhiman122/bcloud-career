import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ManualordergenerationService } from './manualordergeneration.service';

@Component({
  selector: 'app-manualordergeneration',
  templateUrl: './manualordergeneration.component.html',
  styleUrls: ['./manualordergeneration.component.css']
})
export class ManualordergenerationComponent {

  form!: FormGroup;

  isEdited: any = 'NO';
  imageurl: any;
  selectedFile!: File;

  productlist: any = [];
  serviceList: any = [];
  orderlist: any = [];
  productid: any;
  search: any;

  constructor(private service: ManualordergenerationService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      customername: new FormControl(null),
      mobileno: new FormControl(null),
      address: new FormControl(null),
      district: new FormControl(null),
      service: new FormControl(null)
    });
    let mode = localStorage.getItem("mode");
    if (mode && mode === "dark") {
      const main = document.querySelector("main");
      main?.classList.toggle("dark");
    }
    let status = localStorage.getItem("status");
    if (status && status === 'close') {
      const Sidenav = document.querySelector("nav");
      Sidenav?.classList.toggle("close");
    }
    this.getProductList();
    this.addnewRow();
  }

  getProductList(): void {
    this.service.getproduct().subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.serviceList = data.response.servicelist;
      } else {
        this.toaster.error('Getting Product List', 'ERROR WHILE');
      }
    });
  }

  SideToggle() {
    const Sidenav = document.querySelector("nav");
    Sidenav?.classList.toggle("close");
    if (Sidenav?.classList.contains("close")) {
      localStorage.setItem("status", "close");
    } else {
      localStorage.setItem("status", "open");
    }
  }
  deleteProduct(row: any): void {

  }

  save(): void {
    const jsondata = {
      'customername': this.form.controls['customername'].value,
      'mobileno': this.form.controls['mobileno'].value,
      'address': this.form.controls['address'].value,
      'district': this.form.controls['district'].value,
      'service': this.form.controls['service'].value,
    }
    // console.log(jsondata);
    this.service.saveproduct(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.clear();
        this.getProductList();
        this.toaster.success('Product saved Successfully', 'SUCCESSFULLY SAVED');
      }
      else {
        this.toaster.error('Product save Failed', 'ERROR WHILE SAVING');
      }
    });
  }
  clear(): void {
    this.form.controls['customername'].setValue(null);
    this.form.controls['mobileno'].setValue(null);
    this.form.controls['address'].setValue(null);
    this.form.controls['district'].setValue(null);
    this.form.controls['service'].setValue(null);
  }

  setServiceDetails(event: any, odi: any): void {
    console.log(event.value);
  }

  addnewRow(): void{
    const orderlistjsondata = {
      'productid'         : '',
      'availablequantity' : '',
      'unit'              : 'pcs',
      'rate'              : '0',
      'quantity'          : '0',
      'subtotal'          : '0',
      'gstrate'           : '0',
      'taxamount'         : '0',
      'totalamount'       : '0'
    };
    this.orderlist.push(orderlistjsondata);
    console.log(this.orderlist);
  }
  deleteRow(row: any): void{
    let list = this.orderlist.filter((e: { productid: any; }) => e.productid !== row.productid);
    this.orderlist = list;
    if(this.orderlist.length === 0){
      this.addnewRow(); 
    }
  }
}