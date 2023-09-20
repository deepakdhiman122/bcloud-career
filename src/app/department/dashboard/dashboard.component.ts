import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SidenavbarService } from 'src/app/sidenavbar/sidenavbar.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  navbardata: any = [];
  navdata: any = [];
  navchilddata: any = [];
  
  announceform!: FormGroup;
  form!: FormGroup;
  couponform!: FormGroup;
  totalSales: any;
  totalService: any;
  totalfeedbacks: any;
  totalAmc: any;
  
  constructor(public loginroute: Router, protected service: SidenavbarService, private datepipe: DatePipe, private toaster: ToastrService) { }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      usercreationcoins: new FormControl(0),
      userrefercoins:    new FormControl(0)
    });
    this.announceform = new FormGroup({
      notice        : new FormControl(null),
      annoucement   : new FormControl(null),
    });
    this.couponform = new FormGroup({
      couponCode    : new FormControl(null),
      couponvalue   : new FormControl(null),
      startdate     : new FormControl(null),
      enddate       : new FormControl(null)
    });
    let mode = localStorage.getItem("mode");
    if(mode && mode === "dark"){
      const  main = document.querySelector("main");
      main?.classList.toggle("dark");
    }
    let status = localStorage.getItem("status");
    if(status && status === 'close'){
      const Sidenav = document.querySelector("nav");
      Sidenav?.classList.toggle("close");
    }
    // this.getAdminDashboardData();
  }

  save(): void {
    const jsondata = {
      'notice' : this.announceform.controls['notice'].value,
      'annoucement' : this.announceform.controls['annoucement'].value,
    }
    this.service.save(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.toaster.success("Save Successfull");
      }
      else{
        this.toaster.error("Saved Faluire");
      }
    });
  }

  saveCouponDetails(): void{
    const jsondata = {
      'couponCode'   : this.couponform.controls['couponCode'].value,
      'couponvalue'  : this.couponform.controls['couponvalue'].value,
      'startdate'    : this.datepipe.transform(this.couponform.controls['startdate'].value, 'yyyy-MM-dd'),
      'enddate'      : this.datepipe.transform(this.couponform.controls['enddate'].value, 'yyyy-MM-dd')
    }
    this.service.saveCouponDetails(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.toaster.success("Save Successfull");
      }
      else{
        this.toaster.error("Saved Faluire");
      }
    });
  }

  // getAdminDashboardData(): void {
  //   const jsondata = {
  //     'rollid' : localStorage.getItem('rollid')
  //   };
  //   this.service.getAdminDashboardData(jsondata).subscribe(data => {
  //     if (data.status.responseStatus === 'Success') {
  //       this.totalSales = data.response.totalSales;
  //       this.totalService = data.response.totalService;
  //       this.totalfeedbacks = data.response.totalfeedbacks;
  //       this.totalAmc = data.response.totalAmc;
  //     }
  //     else{
  //       alert('Saved Faluire');
  //     }
  //   });
  // }
  DarkMode(){
    const  main = document.querySelector("main");
    main?.classList.toggle("dark");
    if(main?.classList.contains("dark")){
      localStorage.setItem("mode","dark");
    }else{
      localStorage.setItem("mode","light");
    }
  }

  SideToggle(){
    const Sidenav = document.querySelector("nav");
    Sidenav?.classList.toggle("close");
    if(Sidenav?.classList.contains("close")){
      localStorage.setItem("status","close");
    }else{
      localStorage.setItem("status","open");
    }
  }
  
  // logout(): void{
  //   localStorage.clear();
  //   localStorage.setItem('loggedin', 'No');
  //   this.loginroute.navigate(['']);
  // }

  // saveCoins(): void {
  //   const jsondata = {
  //     'usercreationcoins' : this.form.controls['usercreationcoins'].value,
  //     'userrefercoins'    : this.form.controls['userrefercoins'].value
  //   }
  //   this.service.saveCoinManagement(jsondata).subscribe(data => {
  //     if (data.status.responseStatus === 'Success') {
  //       this.toaster.success("Save Successfull");
  //       this.form.controls['usercreationcoins'].setValue(0);
  //       this.form.controls['userrefercoins'].setValue(0);
  //     }
  //     else{
  //       this.toaster.error("Saved Faluire");
  //     }
  //   });
  // }
}