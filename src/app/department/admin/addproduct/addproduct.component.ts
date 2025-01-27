import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddproductService } from './addproduct.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {

  form!: FormGroup;

  isEdited: any = 'NO';
  imageurl: any;
  selectedFile!: File;

  productlist: any = [];
  productid: any;
  deleteId: any;
  search: any;
  getProduct: any = [];
  getProductArray: any = [];
  sucessMsgmessage: any = [];
  msg: any = [];

  constructor(private service: AddproductService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      productname: new FormControl(null),
      brandname: new FormControl(null),
      productcategory: new FormControl(null),
      // productdetails: new FormControl(null),
      rating: new FormControl(null),
      discountpercentage: new FormControl(null),
      salesprice: new FormControl(null),
      mrprice: new FormControl(null)
    });
    let mode = localStorage.getItem("mode");
    if (mode && mode === "dark") {
      const main = document.querySelector("main");
      main?.classList.toggle("dark");
    }
    let status = localStorage.getItem("status");
    if (status && status === 'close') {
      console.log("status ngOnInit", status);

      const Sidenav = document.querySelector("nav");
      Sidenav?.classList.toggle("close");
    }
    this.getProductList();
  }

  getProductList(): void {
    this.service.getproduct().subscribe(data => {
      this.productlist = data;
      this.getProductArray = this.productlist.result;

      // if (data.status.responseStatus === 'Success') {
      //   this.productlist = data.response.productlist;
      // } else {
      //   this.toaster.error('Getting Product List', 'ERROR WHILE');
      // }
      console.log("productlist", this.productlist);

      console.log("data getProductArray", this.getProductArray);

    });
  }

  SideToggle() {
    const Sidenav = document.querySelector("nav");
    Sidenav?.classList.toggle("close");
    if (Sidenav?.classList.contains("close")) {
      localStorage.setItem("status", "close");
    } else {
      localStorage.setItem("status", "open");
    }
  }

  calculator(): void {
    const salesprice = Number.parseFloat(this.form.controls['mrprice'].value) - ((Number.parseFloat(this.form.controls['mrprice'].value) * Number.parseFloat(this.form.controls['discountpercentage'].value)) / 100);
    this.form.controls['salesprice'].setValue(salesprice);
  }

  editrow(row: any): void {
    this.isEdited = 'YES';
    this.form.controls['productname'].setValue(row.productname);
    this.form.controls['brandname'].setValue(row.brandname);
    this.form.controls['productcategory'].setValue(row.productcategory);
    this.form.controls['mrprice'].setValue(row.mrprice);
    this.form.controls['rating'].setValue(row.rating);
    this.form.controls['discountpercentage'].setValue(row.discountpercentage);
    this.form.controls['salesprice'].setValue(row.salesprice);
    // this.form.controls['productdetails'].setValue(row.details);
    this.productid = row._id
    // alert("prodyct id" + this.productid)
    // this.imageurl = row.imageurl;
    console.log(this.isEdited);
  }

  saveImage(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.service.onImageUpload(uploadImageData).subscribe(data => {
      if (data.status === 200) {
        this.imageurl = this.selectedFile.name;
        this.toaster.success('Product Saved Successfull', 'SAVE SUCCESSFULL');
      }
      else {
        this.toaster.error('Product Save Faluire', 'ERROR WHILE PROCESS');
      }
    });
  }

  // deleteProduct(row: any): void {

  // }


  deleteProduct(row: any) {
    const jsondata = {
      deleteId: row._id
    }
    console.log("delete id", row);
    this.service.deletePost(row._id).subscribe(res => {
      console.log("delete res", res);
      this.productlist = [];
    }, err => {
      console.log(err);

    })

    // if (window.confirm('Are you sure want to delete this data id:' + jsondata.deleteId)) {

    // }
  }

  updateProduct(): void {
    // alert("working update function")
    const jsondata = {
      'productname': this.form.controls['productname'].value,
      'brandname': this.form.controls['brandname'].value,
      'productcategory': this.form.controls['productcategory'].value,
      'mrprice': this.form.controls['mrprice'].value,
      'rating': this.form.controls['rating'].value,
      'discountpercentage': this.form.controls['discountpercentage'].value,
      'salesprice': this.form.controls['salesprice'].value,
      // 'userid': localStorage.getItem('userid'),
      'productid': this.productid
    }
    this.service.updateProductt(jsondata).subscribe(data => {
      // alert("working api updates functions" + jsondata)
      console.log("updated", data);
      this.sucessMsgmessage = data
      this.msg = this.sucessMsgmessage.message
      if (this.sucessMsgmessage.message === 'success') {
        this.clear();
        this.getProductList();
        this.toaster.success('Product Updated Successfully', 'SUCCESSFULLY UPDATED');
        console.log("this message", this.msg);
      }
      else {
        this.toaster.error('Product Updating Failed', 'ERROR WHILE UPDATING');
      }
    });
  }
  statuss: any;
  save(): void {
    const jsondata = {
      'productname': this.form.controls['productname'].value,
      'brandname': this.form.controls['brandname'].value,
      'productcategory': this.form.controls['productcategory'].value,
      // 'productdetails': this.form.controls['productdetails'].value,
      'mrprice': this.form.controls['mrprice'].value,
      'discountpercentage': this.form.controls['discountpercentage'].value,
      'salesprice': this.form.controls['salesprice'].value,
      'rating': this.form.controls['rating'].value,
      // 'imageurl': this.imageurl,
      // 'userid': localStorage.getItem('userid')
    }
    this.service.saveproduct(jsondata).subscribe(data => {
      if (jsondata) {
        this.statuss = data.statusCode
        console.log("statusss", this.statuss);
        if (data.statusCode === 201) {
          this.toaster.success('Product saved Successfully', 'SUCCESSFULLY SAVED');
          console.log("sccuessfully save prduct", data);
          this.clear();
          this.getProductList();
        }
        else {
          this.toaster.error('Product save Failed', 'ERROR WHILE SAVING');
        }
      } else {
        console.log('empty fields');

      }


    });
  }
  clear(): void {
    this.form.controls['productname'].setValue(null);
    this.form.controls['brandname'].setValue(null);
    this.form.controls['productcategory'].setValue(null);
    this.form.controls['productdetails'].setValue(null);
    this.form.controls['mrprice'].setValue(0);
    this.form.controls['rating'].setValue(0);
    this.form.controls['discountpercentage'].setValue(0);
    this.form.controls['salesprice'].setValue(0);
    this.form.controls['rating'].setValue(0);
  }
}