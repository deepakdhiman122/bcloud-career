import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../product.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  products: any;
  discount: any = 0;
  cart: Product[]=[];


  constructor(private toastr : ToastrService, private route: Router, private service: CartService){
    const data2 = localStorage.getItem('cartList');
    if(data2){
      this.cart = JSON.parse(data2);
    }
    for(let c of this.cart) {
      c.quantity = 1;
      c.subtotal = c.quantity * c.salesprice;
    }
    // console.log(this.cart);
    this.walletBalance = 0;
    this.walletBalance = localStorage.getItem('walletBalance');
    this.Gtotal();
  }

  walletBalance: any;
  reademCoin(): void {
    this.discount = Number.parseFloat(this.walletBalance.toString()) / 10;
    this.walletBalance = 0;
    this.Gtotal();
  }

  printStars(rating:number) : string{
    rating = +rating;
    let str:string;
    if(rating%1){
      str = "<i class='fa-solid fa-star'></i>".repeat(Math.floor(rating));
    }else{
      str = "<i class='fa-solid fa-star'></i>".repeat(Math.floor(rating));
      str = str +"<i class='fa-solid fa-star-half'></i>";
    }
    return str;
  }

  reedemvaluetype: any;
  selectreadem(reedemValue: any): void {
    // console.log(reedemValue);
    this.reedemvaluetype = reedemValue;
  }

  couponCode: any;
  couponValue: any;
  couponStatus: any;
  reademCoupon(coupon: any): void {
    this.couponCode = coupon.value;
    // this.couponValue = 200;
    const jsondata = {
      'userid' : localStorage.getItem('userid'),
      'couponcode' : this.couponCode
    }
    this.service.verifyCoupon(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.couponValue = data.response.value;
        this.couponStatus = data.response.couponStatus;
        this.discount = this.couponValue;
        this.Gtotal();
      }
      else {
        this.toastr.error('Order Placed Failed', 'ERROR WHILE SAVING');
      }
    });
  }

  removeItem(id:string){
    this.cart = this.cart.filter((object: {productid:string})=>object.productid !== id);
    localStorage.setItem('cartList',JSON.stringify(this.cart));
    setInterval(()=>{this.Gtotal()},100);
  }


  generateOrder(): void {
    const a = localStorage.getItem('islogedin')
    if( a === 'true') {
      const jsondata = {
        'userid' : localStorage.getItem('userid'),
        'discount' : this.discount,
        'grandsubtotal' : this.grandsubtotal,
        'grandtotal'  : this.grandtotal,
        'cart'   : this.cart,
        'reedemvaluetype' : this.reedemvaluetype,
        'couponCode' : this.couponCode
      }
      this.service.generateOrder(jsondata).subscribe(data =>  {
        if (data.status.responseStatus === 'Success') {
          this.toastr.success('YOUR ORDER ID : ' + data.response.orderid);
          this.cart = [];
          localStorage.setItem('cartList',JSON.stringify(this.cart));
          localStorage.setItem('walletBalance', this.walletBalance);
        }
        else {
          this.toastr.error('Order Placed Failed', 'ERROR WHILE SAVING');
        }
      });
    } else {
      this.route.navigate(['/login']);
    } 
  }

  calc(input:any,item: any,){
    if(parseFloat(input.value)<=0){
      this.removeItem(item.id);
    }
    item.quantity = input.value;
    item.subtotal = (parseFloat(input.value)*item.salesprice).toFixed(2);
    this.Gtotal();
  }

  grandsubtotal : any = 0;
  grandtotal : any = 0;
  Gtotal(){
    let res :number = 0;
    for(let a  of this.cart){
      res = Number.parseFloat(res.toString()) + Number.parseFloat((a.subtotal).toString());
    }
    this.grandsubtotal = res.toFixed(2);
    this.grandtotal = this.grandsubtotal - Number.parseFloat(this.discount);
    // if(!parseInt(this.grandtotal)){
    //   const proceed = document.querySelector('.proceed');
    //   proceed?.classList.add('disabled');
    // }
  }

}


