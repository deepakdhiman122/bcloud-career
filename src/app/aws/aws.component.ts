import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AwsService } from './aws.service';
import { ToastrService } from 'ngx-toastr';
import { awsproduct } from '../product.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-aws',
  templateUrl: './aws.component.html',
  styleUrls: ['./aws.component.css']
})
export class AwsComponent {
  constructor(private service: AwsService, private route: Router, private toaster: ToastrService) { }
  awslist: any;
  cart: awsproduct[] = [];
  subtotal: any;
  search: any;

  bannerOptions: OwlOptions = {
    loop: true,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    autoplayHoverPause: true,
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
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 1100,
    autoplaySpeed: 1000,
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
  ngOnInit(): void {
    this.getawsList();
  }

  getawsList(): void {
    this.service.getProducts().then((data) => {
      if (data) {
        this.awslist = data;
        for (let c of this.awslist) {
          c.isCarted = false;
          for (let s of this.cart) {
            if (s.amcid === c.amcid) {
              c.isCarted = s.isCarted;
            }
          }
        }
        for (let c of this.awslist) {
          c.subtotal = Math.round(c.amcprice / 12);
        }
        // console.log( this.awslist)
      } else {
        this.toaster.error('Getting Product List', 'ERROR WHILE');
      }
    });
  }

  addItem(item: any) {
    item.isCarted = true;
    this.cart.push(item);
    this.toaster.success(`${item.name} is added to cart`, 'SUCCESS', {
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      closeButton: true
    });

    //add item to the database using api
    localStorage.setItem('cartList', JSON.stringify(this.cart));
  }
  isDisabled(id: number) {
    this.awslist.forEach((element: any) => {
      if (element.amcid === id) {
        element.isCarted = true;
      }
    });
    //need a method to update the  value of iscarted in the product field
    localStorage.setItem('Awslist', JSON.stringify(this.awslist));
  }
  save(row: any): void {
    const a = localStorage.getItem('islogedin');
    if (a === 'true') {
      const jsondata = {
        'userid': localStorage.getItem('userid'),
        'row': row
      }
      this.service.saveAMCorder(jsondata).subscribe(data => {
        if (data.status.responseStatus === 'Success') {
          const orderid = data.response.orderid;
          this.toaster.success('YOUR Request ID : ' + orderid);
        } else {
          this.toaster.error('Getting Product List', 'ERROR WHILE');
        }
      })
    } else {
      this.route.navigate(['/login']);
    }
  }

  printinvoicewithgstDialog(orderid: any, row: any): void {
    const jsondata = {
      'userid': localStorage.getItem('userid'),
      'orderid': orderid,
      'row': row
    }
    this.service.printAMCOrder(jsondata).subscribe(data => {
      const mediaType = 'application/pdf';
      const blob = new Blob([data], { type: mediaType });
      const blobUrl = URL.createObjectURL(blob);
      const slip = window.open(blobUrl, "print");
      window.setTimeout(function () {
        slip?.print();
      }, 1000);
    });
  }
}