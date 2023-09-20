import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
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
