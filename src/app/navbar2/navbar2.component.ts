import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component {

  cart: { id: number; name: string; image: string; price: number; isCarted:boolean}[]=[];
  constructor(){
    setInterval(()=>{
      const data = localStorage.getItem('cartList');
      if(data){
        this.cart = JSON.parse(data);
      }
    },100);
  }
}
