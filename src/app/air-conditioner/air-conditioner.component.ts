import { Component } from '@angular/core';
import { AirConditionerService } from './air-conditioner.service';
import { ToastrService } from 'ngx-toastr';
import { serviceproduct } from '../product.model';
@Component({
  selector: 'app-air-conditioner',
  templateUrl: './air-conditioner.component.html',
  styleUrls: ['./air-conditioner.component.css']
})
export class AirConditionerComponent {
  productlist: serviceproduct[] = [];
  cart: serviceproduct[] = [];

  serviceCategory: any;
  mainservice: boolean = false;
  repair: boolean = false;
  installetion: boolean = false;

  constructor(private service: AirConditionerService, private toaster: ToastrService) { }
  ngOnInit(): void {
    const data2 = localStorage.getItem('cartList');
    if (data2) {
      this.cart = JSON.parse(data2);
    }
    this.serviceCategory = localStorage.getItem('serviceproductcategory');
    this.getProductList()
  }
  getProductList(): void {
    this.service.getproduct().subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.productlist = data.response.servicelist;
        for (let c of this.productlist) {
          c.isCarted = false;
          if (c.serviceproductcategory === this.serviceCategory) {
            if (c.servicetypes === 'Main Service') {
              this.mainservice = true;
            }
            if (c.servicetypes === 'Repair Services') {
              this.repair = true;
            }
            if (c.servicetypes === 'Installetion') {
              this.installetion = true;
            }
            c.details1 = c.details.split(".");
          }
          for (let s of this.cart) {
            if (s.productid === c.productid) {
              c.isCarted = s.isCarted;
            }
          }
          this.productlist = this.productlist.filter(e => e.serviceproductcategory === this.serviceCategory)
        }
        // console.log( this.productlist)
      } else {
        this.toaster.error('Getting Product List', 'ERROR WHILE');
      }
    });
  }
  addItem(item: any) {
    item.isCarted = true;
    this.isDisabled(item.id);
    this.cart.push(item);
    this.toaster.success(`${item.name} is added to cart`, 'SUCCESS', {
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      closeButton: true
    });

    //add item to the database using api
    localStorage.setItem('cartList', JSON.stringify(this.cart));
  }
  isDisabled(id: string) {
    this.productlist.forEach(element => {
      if (element.productid === id) {
        element.isCarted = true;
      }
    });
    //need a method to update the  value of iscarted in the product field
    localStorage.setItem('ProductList', JSON.stringify(this.productlist));
  }
}
