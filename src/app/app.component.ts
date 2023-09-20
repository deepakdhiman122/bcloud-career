import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'electrician';
  
  constructor(public loginroute: Router) {   
      // loginroute.navigate(['/dashboard']);
      if(localStorage.getItem('rollid') === 'customer') {
        loginroute.navigate(['/cart']);  
      } else if(localStorage.getItem('rollid') === 'servicesngineer') {
        loginroute.navigate(['/employeedashboard']);
      } else if(localStorage.getItem('rollid') === 'admin'){
        loginroute.navigate(['/dashboard']);
      } else {
        loginroute.navigate(['/home']);
      }
  }

  ngOnInit(): void {
    const data1 = require ('./product.json');
    if(!localStorage.getItem('ProductList')){
      localStorage.setItem('ProductList',JSON.stringify(data1));
    }
    // localStorage.removeItem('ProductList');
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }
}