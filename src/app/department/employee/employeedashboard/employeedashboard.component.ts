import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeedashboardService } from './employeedashboard.service';

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.css']
})
export class EmployeedashboardComponent {

  serviceOrderList: any = [];

  pendingServiceCount: any;
  totalServicesCount: any;
  successfulServicesCount: any;
  search: any;

  form!: FormGroup;

  constructor(public loginroute: Router, protected service: EmployeedashboardService, private toaster: ToastrService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      usercreationcoins: new FormControl(0),
      userrefercoins: new FormControl(0)
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
    this.getemployeeDashboardData();
    this.getServicesOrder();
  }

  getServicesOrder(): void{
    const jsondata = {
      'empid' : localStorage.getItem('userid')
    }
    this.service.getServicesOrder(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.serviceOrderList = data.response.serviceOrderList;
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

  productview(row: any):void{
    localStorage.setItem("orderid",row.orderid);
   }
   
  getemployeeDashboardData(): void {
    const jsondata = {
      'userid': localStorage.getItem('userid')
    };
    this.service.getemployeeDashboardData(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.pendingServiceCount = data.response.pendingServiceCount;
        this.totalServicesCount = data.response.totalServicesCount;
        this.successfulServicesCount = data.response.successfulServicesCount;
      }
      else {
        alert('Saved Faluire');
      }
    });
  }
  DarkMode() {
    const main = document.querySelector("main");
    main?.classList.toggle("dark");
    if (main?.classList.contains("dark")) {
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.setItem("mode", "light");
    }
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

  logout(): void {
    localStorage.clear();
    localStorage.setItem('loggedin', 'No');
    this.loginroute.navigate(['']);
  }

  saveCoins(): void {
    const jsondata = {
      'usercreationcoins': this.form.controls['usercreationcoins'].value,
      'userrefercoins': this.form.controls['userrefercoins'].value
    }
    this.service.saveCoinManagement(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.toaster.success("Save Successfull");
        this.form.controls['usercreationcoins'].setValue(0);
        this.form.controls['userrefercoins'].setValue(0);
      }
      else {
        this.toaster.error("Saved Faluire");
      }
    });
  }
}