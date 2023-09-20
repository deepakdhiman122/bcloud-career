import { Component} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeService } from './home.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent{
  productOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayTimeout:1500,
    autoplaySpeed:1000,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 100,
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

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
  productlist: any = [];
  products:any;
  serviceslist:any=[];
  reviwelist:any
  constructor(private service: HomeService,private toaster: ToastrService){
    const data = localStorage.getItem('ProductList');
    if (data) {
      this.products = JSON.parse(data);
    }
  }
  ngOnInit(): void{
   this.getProductList()
   this.getServicesList()
   this.getReviwelist()
  }

  getProductList(): void {
    this.service.getproduct().subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.productlist = data.response.productlist;
        // console.log( this.productlist)
      } else {
        this.toaster.error('Getting Product List', 'ERROR WHILE');
      }
    });
  }
  getServicesList(): void {
    this.service.getservices().subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.serviceslist = data.response.servicelist;
        // console.log( this.serviceslist)
      } else {
        this.toaster.error('Getting Product List', 'ERROR WHILE');
      }
    });
  }
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

}
