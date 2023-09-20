import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ViewamcordersService } from './viewamcorders.service';

@Component({
  selector: 'app-viewamcorders',
  templateUrl: './viewamcorders.component.html',
  styleUrls: ['./viewamcorders.component.css']
})
export class ViewamcordersComponent {

  form!: FormGroup;

  serviceOrderList: any = [];
  employeelist: any = [];
  search: any

  constructor(private service: ViewamcordersService, private toaster: ToastrService, private datePipe: DatePipe) { }

  ngOnInit(): void {
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
    this.form = new FormGroup({
      ordernumber          : new FormControl(null),
      modelno              : new FormControl(null),
      serialno             : new FormControl(null),
      contractstartdate    : new FormControl(null),
      orderstatus          : new FormControl('D')
    });
    this.getServicesOrder();
    this.getEmployee();
  }

  getEmployee(): void{
    this.service.getEmployeeList().subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.employeelist = data.response.employeelist;
      } else {
        this.toaster.error('Getting Product List', 'ERROR WHILE');
      }
    });
  }

  getServicesOrder(): void{
    this.service.getServicesOrder().subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.serviceOrderList = data.response.amcOrderList;
        for(let sol of this.serviceOrderList){
          if(sol.orderstatus === 'D') {
            sol.orderstatus1 = 'Closed';
          } else if(sol.orderstatus === 'C') {
            sol.orderstatus1 = 'Cancel';
          } else if(sol.orderstatus === 'P') {
            sol.orderstatus1 = 'Pending';
          } else if(sol.orderstatus === 'O') {
            sol.orderstatus1 = 'Open';
          } else if(sol.orderstatus === 'R') {
            sol.orderstatus1 = 'Revert';
          }
          sol.addedon1 = this.datePipe.transform(sol.addedon, 'dd/MM/yyyy');
          sol.modifiedon1 = this.datePipe.transform(sol.modifiedon, 'dd/MM/yyyy');
        }
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

  editrow(row: any): void {
    this.form.controls['ordernumber'].setValue(row.orderid);
  }

  deleteProduct(row: any): void {

  }

  save(): void {
    const jsondata = {
      'orderid'   : this.form.controls['ordernumber'].value,
      'modelno'  : this.form.controls['modelno'].value,
      'serialno'  : this.form.controls['serialno'].value,
      'contractstartdate'  : this.datePipe.transform(this.form.controls['contractstartdate'].value, 'yyyy-MM-dd'),
      'orderstatus'  : this.form.controls['orderstatus'].value
    }
    this.service.assignOrderTO(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.toaster.success('Order Placed Successfully', 'SUCCESSFULLY SAVED');
        this.clear();
      }
      else {
        this.toaster.error('Order Placed Failed', 'ERROR WHILE SAVING');
      }
    });
  }

  clear(): void {
    this.form.controls['ordernumber'].setValue(null),
    this.form.controls['employee'].setValue(null)
  }

  printOrder(orderRow: any): void {
   
    const orderid = orderRow.orderid;
    const userid = orderRow.userid;
    const jsondata = {
      'amcid' : orderRow.productid
    }
    this.service.getAMCorderDetails(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        const row = data.response.amcservicelist;
        this.printinvoicewithgstDialog(orderid, row, orderRow, userid);
      }
      else {
        this.toaster.error('Order Placed Failed', 'ERROR WHILE SAVING');
      }
    });
  
  }

  printinvoicewithgstDialog(orderid: any, row: any, orderRow: any, userid: any): void{
    const jsondata = {
      'userid' : userid,
      'orderid' : orderid,
      'orderRow' : orderRow,
      'row' : row[0]
    }
    this.service.printAMCOrder(jsondata).subscribe(data => {
      const mediaType = 'application/pdf';
      const blob = new Blob([data], { type: mediaType });
      const blobUrl = URL.createObjectURL(blob);
      const slip = window.open(blobUrl, "print");
      window.setTimeout(function(){
        slip?.print();
      }, 1000);
    });
  }
}