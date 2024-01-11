import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from './navbar.service';
import { ToastrService } from 'ngx-toastr';
import { awsproduct } from '../product.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  cart: { id: number; name: string; image: string; price: number; isCarted: boolean }[] = [];
  isLogined: any;
  awslist: awsproduct[] = [];


  constructor(public loginroute: Router, private service: NavbarService, private toaster: ToastrService) {
    setInterval(() => {
      const data = localStorage.getItem('cartList');
      if (data) {
        this.cart = JSON.parse(data);
      }
    }, 100);
    this.isLogined = localStorage.getItem('islogedin');
  }
  ngOnInit(): void {
    this.grtannoucementList();
    this.getawsList();
  }
  annoucement: any = [];
  grtannoucementList(): void {
    this.service.getannoucementlist().subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.annoucement = data.response.announcementdetails;
        console.log(this.annoucement)
      } else {
        this.toaster.error('Getting Product List', 'ERROR WHILE');
      }
    });
  }

  getawsList(): void {
    this.service.getawslist().subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.awslist = data.response.amcservicelist;
        for (let c of this.awslist) {
          c.isCarted = false;
        }
        for (let c of this.awslist) {
          c.subtotal = Math.round(c.amcprice / 12);
        }
        console.log(this.awslist)
      } else {
        this.toaster.error('Getting Product List', 'ERROR WHILE');
      }
    });
  }

  filter(searchProduct: any): void {
    for (let al of this.awslist) {
      if (al.amcname.includes(searchProduct.value)) {

      }
    }
  }
  displayVal = ''
  getvalue(val: any) {
    console.log('Search Value :', val.target.value);
    this.displayVal = val.target.value;
    if (this.displayVal.toLowerCase() === 'ac service' || this.displayVal.toLowerCase() === 'ac repair' || this.displayVal.toLowerCase() === 'ac installation'
      || this.displayVal.toLowerCase() === 'ac gas charging' || this.displayVal.toLowerCase() === 'split ac installation' || this.displayVal.toLowerCase() === 'window ac installation'
      || this.displayVal.toLowerCase() === 'split ac gas charging' || this.displayVal.toLowerCase() === 'window ac gas charging' || this.displayVal.toLowerCase() === 'window ac service'
      || this.displayVal.toLowerCase() === 'split ac service') {
      localStorage.setItem('serviceproductcategory', 'Air Conditioner');
      this.loginroute.navigate(['/airconditioner']);
    }
    if (this.displayVal.toLowerCase() === 'washing machine repair') {
      localStorage.setItem('serviceproductcategory', 'Washing Machine');
      this.loginroute.navigate(['/airconditioner']);
    }
    if (this.displayVal.toLowerCase() === 'led repair' || this.displayVal.toLowerCase() === 'led installation') {
      localStorage.setItem('serviceproductcategory', 'LED TV');
      this.loginroute.navigate(['/airconditioner']);
    }
    if (this.displayVal.toLowerCase() === 'geyser repair' || this.displayVal.toLowerCase() === 'geyser installation') {
      localStorage.setItem('serviceproductcategory', 'Geyser');
      this.loginroute.navigate(['/airconditioner']);
    }
    if (this.displayVal.toLowerCase() === 'chimney repair' || this.displayVal.toLowerCase() === 'chimney installation') {
      localStorage.setItem('serviceproductcategory', 'Chimney');
      this.loginroute.navigate(['/airconditioner']);
    }
    if (this.displayVal.toLowerCase() === 'microwave repair') {
      localStorage.setItem('serviceproductcategory', 'Microwave');
      this.loginroute.navigate(['/airconditioner']);
    }
    if (this.displayVal.toLowerCase() === 'refrigerator repair' || this.displayVal.toLowerCase() === 'refrigerator gas charging' || this.displayVal.toLowerCase() === 'single door refrigerator repair'
      || this.displayVal.toLowerCase() === 'double door refrigerator repair' || this.displayVal.toLowerCase() === 'single door refrigerator gas charging' || this.displayVal.toLowerCase() === 'double door refrigerator gas charging') {
      localStorage.setItem('serviceproductcategory', 'Refrigerator');
      this.loginroute.navigate(['/airconditioner']);
    }
  }
  logout(): void {
    localStorage.clear();
    localStorage.setItem('islogedin', 'No');
    this.loginroute.navigate(['/login']);
  }
}
