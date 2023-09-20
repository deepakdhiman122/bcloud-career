import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ViewproductordersService } from './viewproductorders.service';

@Component({
  selector: 'app-viewproductorders',
  templateUrl: './viewproductorders.component.html',
  styleUrls: ['./viewproductorders.component.css']
})
export class ViewproductordersComponent {

  form!: FormGroup;

  productOrderList: any = [];
  employeelist: any = [];
  search : any;

  constructor(private service: ViewproductordersService, private toaster: ToastrService, private datePipe: DatePipe) { }

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
      'ordernumber' : new FormControl(null),
      'employee'    : new FormControl(null)
    });
    this.getProductOrder();
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

  getProductOrder(): void{
    this.service.getProductOrder().subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.productOrderList = data.response.productOrderList;
        for(let sol of this.productOrderList){
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
  productview(row: any):void{
    localStorage.setItem("orderid",row.orderid);
   }
  editrow(row: any): void {
    this.form.controls['ordernumber'].setValue(row.orderid);
  }

  deleteProduct(row: any): void {

  }

  save(): void {
    const jsondata = {
      'orderid'   : this.form.controls['ordernumber'].value,
      'employee'  : this.form.controls['employee'].value,
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
}
