import { Component } from '@angular/core';
import { UserdashboardService } from './userdashboard.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AirConditionerService } from 'src/app/air-conditioner/air-conditioner.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent {
  reviewForm!: FormGroup;
  userForm!: FormGroup;
  form!: FormGroup;

  userdetails: any = [];
  orderList: any = [];

  walletBalance: any;
  couponBalance: any;
  productlist: any;

  constructor(private service: UserdashboardService, private toaster: ToastrService, private datePipe: DatePipe, private servicee: AirConditionerService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null),
      mobileno: new FormControl(null),
      address: new FormControl(null),
      district: new FormControl(null),
      email: new FormControl(null)
    });
    this.reviewForm = new FormGroup({
      rating: new FormControl(null),
      review: new FormControl(null),
    });
    this.getUserDetails();
    this.getCustomerOrderDetails();
    this.getservice();
  }

  getCustomerOrderDetails(): void {
    const jsondata = {
      'userid': localStorage.getItem('userid')
    }
    this.service.getCustomerOrderDetails(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.orderList = data.response.orderList;
        for (let od of this.orderList) {
          od.date = this.datePipe.transform(od.addedon, 'dd/MM/yyyy');
          if (od.ordertype === 'P') {
            od.ordertype1 = 'Product Purchased';
          } else if (od.ordertype === 'S') {
            od.ordertype1 = 'Service Availed';
          } else if (od.ordertype === 'A') {
            od.ordertype1 = 'AMC Availed';
          }
          if (od.orderstatus === 'P') {
            od.orderstatus1 = 'Pending';
          } else if (od.orderstatus === 'C') {
            od.orderstatus1 = 'Canceled';
          } else if (od.orderstatus === 'D') {
            od.orderstatus1 = 'Done';
          }
        }
      }
      else {
        alert('Saved Faluire');
      }
    });
  }

  getUserDetails(): void {
    const jsondata = {
      'userid': localStorage.getItem('userid')
    }
    this.service.getUserDetails(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.userdetails = data.response.userdetails;
        this.walletBalance = this.userdetails[0].walletbalance;
        this.couponBalance = this.userdetails[0].couponcode;
        this.form.controls['username'].setValue(this.userdetails[0].name);
        this.form.controls['mobileno'].setValue(this.userdetails[0].mobileno);
        this.form.controls['address'].setValue(this.userdetails[0].address);
        this.form.controls['district'].setValue(this.userdetails[0].district);
        this.form.controls['email'].setValue(this.userdetails[0].emailaddress);
      }
      else {
        alert('Saved Faluire');
      }
    });
  }

  save(): void {
    const jsondata = {
      'rating': this.reviewForm.controls['rating'].value,
      'review': this.reviewForm.controls['review'].value,
      'userid': localStorage.getItem('userid')
    }
    this.service.save(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.toaster.success('Status Updated', 'SAVED SUCCESSFULLY');
      } else {
        this.toaster.error('Getting Product List', 'ERROR WHILE');
      }
    });
  }

  getservice() {
    this.servicee.getproduct().then((data) => {
      this.productlist = data
      console.log("data user dashboard ", data);

    })
  }
}