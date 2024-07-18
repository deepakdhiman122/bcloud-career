import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { elementAt } from 'rxjs';
import { Product } from '../product.model';
import { ShopService } from './shop.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  @ViewChild('priceRange', { static: true }) priceRange!: ElementRef;
  @ViewChild('priceInput', { static: true }) priceInput!: ElementRef;

  // products: Product[] = [];
  cart: Product[] = [];
  category: any;
  company: any;
  productlist: Product[] = [];
  currentPage = 1;
  pageSize = 12;

  form = new FormGroup({
    priceRange: new FormControl(0),
    category: new FormControl(''),
    company: new FormGroup({} as { [key: string]: FormControl; }),
  });
  Newproductlist: Product[] = [];
  str: any;



  constructor(private toastr: ToastrService, private service: ShopService) { }

  ngOnInit(): void {

    const data2 = localStorage.getItem('cartList');
    if (data2) {
      this.cart = JSON.parse(data2);
    }
    this.getProductList();
    // console.log(this.company);
    this.priceRange.nativeElement.value = this.priceInput.nativeElement.value = 0;

    // this.company((Option: any) => {
    //   if (this.form.get('company') instanceof FormGroup) {
    //     (this.form.get('company') as FormGroup).addControl(Option, new FormControl(false));
    //   }
    // })
    const hstr = window.location.href;
    this.str = hstr.toString();
    const strarry = this.str.split('/#/');
    console.log('hostname  :  ', strarry[1]);
  }
  getProductList(): void {
    this.service.getproduct().subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.productlist = data.response.productlist;
        this.Newproductlist = this.productlist;
        this.Categories();
        this.Company();
        for (let c of this.productlist) {
          c.isCarted = false;
          for (let s of this.cart) {
            if (s.productid === c.productid) {
              c.isCarted = s.isCarted;
            }
          }
          c.details1 = c.details.split(".");
        }
        // console.log(this.productlist);

        // console.log(this.products)
      } else {
        this.toastr.error('Getting Product List', 'ERROR WHILE');
      }
    });
  }
  setinput: any = "ALL";
  inputprice(i: any): void {
    this.setinput = i.value;
    this.filterlist();
  }
  brandforfilter: any = 'ALL';
  brand(i: any): void {
    this.brandforfilter = i;
    this.filterlist();
  }
  categoryforfilter: any = 'ALL';
  categoryFilter(i: any): void {
    this.categoryforfilter = i;
    this.filterlist();
  }

  filterlist(): void {
    if (this.brandforfilter != 'ALL') {
      this.Newproductlist = this.productlist.filter(e => e.brand === this.brandforfilter);
      if (this.categoryforfilter != 'ALL') {
        this.Newproductlist = this.Newproductlist.filter(e => e.productcategory === this.categoryforfilter);
      }
      if (this.setinput > 1000) {
        this.Newproductlist = this.Newproductlist.filter(e => e.salesprice <= this.setinput);
      }
    } else if (this.brandforfilter === 'ALL') {
      this.Newproductlist = this.productlist.filter(e => e.brand != 'ALL');
      if (this.categoryforfilter != 'ALL') {
        this.Newproductlist = this.Newproductlist.filter(e => e.productcategory === this.categoryforfilter);
      }
      if (this.setinput > 1000) {
        this.Newproductlist = this.Newproductlist.filter(e => e.salesprice <= this.setinput);
      }
    }
    if (this.categoryforfilter != 'ALL') {
      this.Newproductlist = this.productlist.filter(e => e.productcategory === this.categoryforfilter);
      if (this.brandforfilter != 'ALL') {
        this.Newproductlist = this.Newproductlist.filter(e => e.brand === this.brandforfilter);
      }
      if (this.setinput > 1000) {
        this.Newproductlist = this.Newproductlist.filter(e => e.salesprice <= this.setinput);
      }
    } else if (this.categoryforfilter === 'ALL') {
      this.Newproductlist = this.productlist.filter(e => e.productcategory != 'ALL');
      if (this.brandforfilter != 'ALL') {
        this.Newproductlist = this.Newproductlist.filter(e => e.brand === this.brandforfilter);
      }
      if (this.setinput > 1000) {
        this.Newproductlist = this.Newproductlist.filter(e => e.salesprice <= this.setinput);
      }
    }
  }

  onRangeInput() {
    this.priceInput.nativeElement.value = this.priceRange.nativeElement.value;
  }

  onInputInput() {
    this.priceRange.nativeElement.value = this.priceInput.nativeElement.value;
    // console.log("onInputInput", this.priceRange.nativeElement.value)
  }

  Categories() {
    this.category = this.productlist.reduce((cat: string[], pdt: any) => {
      if (!cat.includes(pdt.productcategory)) {
        cat.push(pdt.productcategory);
      }
      return cat;
    }, []);
  }
  host(): void {
    const hstr = window.location.href;
    this.str = hstr.toString();
    const strarry = this.str.split('/#/');
    if (strarry[1] === "shopping") {
      window.location.reload();
    }
  }
  Company() {
    this.company = this.productlist.reduce((com: string[], pdt: any) => {
      if (!com.includes(pdt.brand)) {
        com.push(pdt.brand);
      }
      return com;
    }, []);
  }

  List() {
    const Cards = document.querySelectorAll('.Cards');
    Cards.forEach(element => {
      element.classList.add('list');
    })
  }

  Grid() {
    const Cards = document.querySelectorAll('.Cards');
    Cards.forEach(element => {
      element.classList.remove('list');
    })
  }

  Sorting() {
    const sorting = <HTMLSelectElement>document.getElementById('sorting');
    this.Filter();
    if (sorting.value === 'ascending') {
      this.productlist = this.productlist.sort((a: any, b: any) => a.salesprice - b.salesprice);
    }
    else if (sorting.value === 'descending') {
      this.productlist = this.productlist.sort((a: any, b: any) => b.salesprice - a.salesprice);
    }
    else {
      this.productlist;
    }
  }

  Filter() {
    // if(this.form.value.priceRange !== 0){
    //   this.products = this.products.filter((element)=> element.price <= this.form?.get('priceRange')?.value);
    // }
    // const data1 = localStorage.getItem('ProductList');
    // if (data1) {
    //   this.products = JSON.parse(data1);
    // }
    this.getProductList();
    // let updatedProducts: Product[] = [];
    let updatedProducts: any;
    let flag: boolean = true;
    if (this.form.value.category !== '') {
      this.company.forEach((option: string) => {
        if (this.form.get('company')?.get(option)?.value) {
          flag = false;
          updatedProducts.push(...this.productlist.filter((product: { productcategory: string | null | undefined; brand: string; }) => product.productcategory === this.form.value.category && product.brand === option));
        }
      });
      if (flag) {
        updatedProducts = this.productlist.filter((product: { productcategory: string | null | undefined; }) => product.productcategory === this.form.value.category);
      }
      this.productlist = updatedProducts;
    } else {
      this.company.forEach((option: string) => {
        if (this.form.get('company')?.get(option)?.value) {
          this.productlist = this.productlist.filter((product: { brand: string; }) => product.brand === option);
        }
      });
    }
  }

  onSubmit() {
    this.Filter();
    this.Sorting();
  }

  onReset() {
    this.getProductList();
  }

  addItem(item: any) {
    item.isCarted = true;
    this.isDisabled(item.id);
    this.cart.push(item);
    this.toastr.success(`${item.name} is added to cart`, 'SUCCESS', {
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

  printStars(rating: number): string {
    rating = +rating;
    let str: string;
    if (rating % 1) {
      str = "<i class='fa-solid fa-star'></i>".repeat(Math.floor(rating));
    } else {
      str = "<i class='fa-solid fa-star'></i>".repeat(Math.floor(rating));
      str = str + "<i class='fa-solid fa-star-half'></i>";
    }
    return str;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.productlist.length / this.pageSize)) {
      this.currentPage++;
    }
  }
}