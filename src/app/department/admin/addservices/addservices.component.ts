import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddservicesService } from './addservices.service';

@Component({
  selector: 'app-addservices',
  templateUrl: './addservices.component.html',
  styleUrls: ['./addservices.component.css']
})
export class AddservicesComponent {

  form!: FormGroup;

  isEdited: any = 'NO';
  imageurl: any;
  selectedFile!: File;

  servicelist: any = [];
  productid: any;
  search: any;

  constructor(private service: AddservicesService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      servicename: new FormControl(null),
      serviceproducttype: new FormControl(null),
      serviceproductcategory: new FormControl(null),
      servicedetails: new FormControl(null),
      rating: new FormControl(null),
      salesprice: new FormControl(null)
    });
    let mode = localStorage.getItem("mode");
    if (mode && mode === "dark") {
      const main = document.querySelector("main");
      main?.classList.toggle("dark");
    }
    let status = localStorage.getItem("status");
    if (status && status === 'close') {
      const Sidenav = document.querySelector("nav");
      Sidenav?.classList.toggle("close");
    }
    this.getProductList();
  }

  getProductList(): void {
    this.service.getservicelist().subscribe(data => {
      if (data) {
        this.servicelist = data.data;
        console.log(this.servicelist);
        this.toaster.success('Product saved Successfully', 'SUCCESSFULLY SAVED');
      } else {
        this.toaster.error('Getting Product List', 'ERROR WHILE');
      }
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
    this.form.controls['servicename'].setValue(row.name);
    this.form.controls['serviceproducttype'].setValue(row.serviceproducttype);
    this.form.controls['serviceproductcategory'].setValue(row.serviceproductcategory);
    this.form.controls['servicedetails'].setValue(row.details);
    this.form.controls['rating'].setValue(row.productrating);
    this.form.controls['salesprice'].setValue(row.salesprice);
    this.productid = row.productid
    this.imageurl = row.imageurl;
    console.log(this.isEdited);
  }

  saveImage(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.service.onImageUpload(uploadImageData).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.imageurl = data.response.imageURL;
        this.toaster.success('Product Saved Successfull', 'SAVE SUCCESSFULL');
      }
      else {
        this.toaster.error('Product Save Faluire', 'ERROR WHILE PROCESS');
      }
    });
  }

  deleteProduct(row: any): void {

  }

  updateProduct(): void {
    const jsondata = {
      'servicename': this.form.controls['servicename'].value,
      'serviceproducttype': this.form.controls['serviceproducttype'].value,
      'serviceproductcategory': this.form.controls['serviceproductcategory'].value,
      'servicedetails': this.form.controls['servicedetails'].value,
      'salesprice': this.form.controls['salesprice'].value,
      'rating': this.form.controls['rating'].value,
      'imageurl': this.imageurl,
      'userid': localStorage.getItem('userid'),
      'productid': this.productid
    }
    this.service.updateProduct(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.clear();
        this.toaster.success('Product Updated Successfully', 'SUCCESSFULLY UPDATED');
      }
      else {
        this.toaster.error('Product Updating Failed', 'ERROR WHILE UPDATING');
      }
    });
  }

  save(): void {
    const jsondata = {
      'servicename': this.form.controls['servicename'].value,
      'serviceproducttype': this.form.controls['serviceproducttype'].value,
      'serviceproductcategory': this.form.controls['serviceproductcategory'].value,
      'servicedetails': this.form.controls['servicedetails'].value,
      'salesprice': this.form.controls['salesprice'].value,
      'rating': this.form.controls['rating'].value,
      'imageurl': this.imageurl,
      'userid': localStorage.getItem('userid')
    }
    this.service.saveServices(jsondata).subscribe(data => {
      if (data) {
        this.clear();
        this.getProductList();
        this.toaster.success('Product saved Successfully', 'SUCCESSFULLY SAVED');
      }
      else {
        this.toaster.error('Product save Failed', 'ERROR WHILE SAVING');
      }
    });
  }
  clear(): void {
    this.form.controls['servicename'].setValue(null);
    this.form.controls['serviceproducttype'].setValue(null);
    this.form.controls['serviceproductcategory'].setValue(null);
    this.form.controls['servicedetails'].setValue(null);
    this.form.controls['rating'].setValue(0);
    this.form.controls['salesprice'].setValue(0);
  }
}