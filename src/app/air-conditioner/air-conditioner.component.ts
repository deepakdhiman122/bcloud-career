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
  cart: serviceproduct[] = [];
  productlist: any;
  serviceCategory: any;
  repair: boolean = false;
  mainservice: boolean = true;
  installetion: boolean = false;

  constructor(private service: AirConditionerService, private toaster: ToastrService) { }

  ngOnInit(): void {
    const data2 = localStorage.getItem('cartList');
    if (data2) {
      this.cart = JSON.parse(data2);
    }
    this.serviceCategory = localStorage.getItem('serviceproductcategory');
    this.getProductList();
  }

  getProductList(): void {
    this.service.getproduct().then((data: any) => {
      if (data) {
        this.productlist = data.filter((c: any) => c.serviceproductcategory === this.serviceCategory);

        this.installetion = this.productlist.some((product: any) => product.servicetypes === 'installetion');

        for (let c of this.productlist) {
          c.isCarted = false;

          if (c.servicetypes === 'Main Service') {
            this.mainservice = true;
          }

          if (c.servicetypes === 'Repair Services') {
            this.repair = true;
          }

          c.details1 = c.details.split(".");

          for (let s of this.cart) {
            if (s.productid === c.productid) {
              c.isCarted = s.isCarted;
            }
          }
        }

        this.toaster.success('Successfully retrieved product list', 'Success');
      } else {
        this.toaster.error('Error while retrieving product list', 'Error');
      }
    }).catch(error => {
      console.error('Error while fetching product list:', error);
      this.toaster.error('Error while retrieving product list', 'Error');
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

    localStorage.setItem('cartList', JSON.stringify(this.cart));
  }

  isDisabled(id: string) {
    this.productlist.forEach((element: any) => {
      if (element.productid === id) {
        element.isCarted = true;
      }
    });
    localStorage.setItem('ProductList', JSON.stringify(this.productlist));
  }

  toggleService() {
    this.mainservice = true;
    this.installetion = false;
  }

  toggleInstallation() {
    this.mainservice = true;
    this.installetion = true;
  }
}
