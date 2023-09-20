import { HtmlParser } from '@angular/compiler';
import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ServicesService } from './services.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  productlist:any=[]
  constructor(private service: ServicesService,private toaster: ToastrService){}
  bannerOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplaySpeed:1000,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 100,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  
  services = 'ac';
  changeService(s:any){
    this.service = s;
    const el = document.getElementById('serv');
    el?.scrollIntoView({
      behavior:'smooth'
    });
  }
  ngOnInit(): void{
    this.getProductList()
    this.getReviwelist()
   }
  getProductList(): void {
    this.service.getproduct().subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.productlist = data.response.servicelist;
        // this.productlist = this.productlist.filter((e: { serviceproductcategory: string | null; }) => e.serviceproductcategory === localStorage.getItem(''));
        // console.log( this.productlist)
      } else {
        this.toaster.error('Getting Product List', 'ERROR WHILE');
      }
    });
  }
  reviwelist:any;
  getReviwelist(): void {
    const jsondata ={
      "userid":("userid"),
    }
    this.service.getreviwe(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.reviwelist = data.response.userFeedback;
        // console.log( this.reviwelist)
      } else {
        this.toaster.error('Getting Product List', 'ERROR WHILE');
      }
    });
  }
  callservice(value: any): void{
    localStorage.setItem('serviceproductcategory' , value);
    
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
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayTimeout:1100,
    autoplaySpeed:1000,
    dots: false,
    navSpeed: 100,
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 4
      },
      400: {
        items: 6
      },
      740: {
        items: 8
      },
      940: {
        items: 8
      }
    },
    nav: false
  }
  
}

