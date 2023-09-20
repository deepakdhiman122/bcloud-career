import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddnewamcService } from './addnewamc.service';

@Component({
  selector: 'app-addnewamc',
  templateUrl: './addnewamc.component.html',
  styleUrls: ['./addnewamc.component.css']
})
export class AddnewamcComponent {

  form!: FormGroup;

  isEdited: any = 'NO';
  imageurl: any;
  selectedFile!: File;

  amcservicelist: any = [];
  amcid: any;
  search: any;

  constructor(private service: AddnewamcService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      amcname       : new FormControl(null),
      amcheading    : new FormControl(null),
      amccovers     : new FormControl(null),
      salesprice    : new FormControl(null),
      keybenefit1   : new FormControl(null),
      keybenefit2   : new FormControl(null),
      keybenefit3   : new FormControl(null),
      keybenefit4   : new FormControl(null),
      keybenefit5   : new FormControl(null),
      keybenefit6   : new FormControl(null),
      keybenefit7   : new FormControl(null),
      keybenefit8   : new FormControl(null),
      keybenefit9   : new FormControl(null),
      keybenefit10  : new FormControl(null),
      keybenefit11  : new FormControl(null),
      keybenefit12  : new FormControl(null)
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
    this.service.getproduct().subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.amcservicelist = data.response.amcservicelist;
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
    this.form.controls['amcname'].setValue(row.amcname),
    this.form.controls['amcheading'].setValue(row.amcheading),
    this.form.controls['amccovers'].setValue(row.amccovers),
    this.form.controls['salesprice'].setValue(row.amcprice),
    this.form.controls['keybenefit1'].setValue(row.keybenefits1),
    this.form.controls['keybenefit2'].setValue(row.keybenefits2),
    this.form.controls['keybenefit3'].setValue(row.keybenefits3),
    this.form.controls['keybenefit4'].setValue(row.keybenefits4),
    this.form.controls['keybenefit5'].setValue(row.keybenefits5),
    this.form.controls['keybenefit6'].setValue(row.keybenefits6),
    this.form.controls['keybenefit7'].setValue(row.keybenefits7),
    this.form.controls['keybenefit8'].setValue(row.keybenefits8),
    this.form.controls['keybenefit9'].setValue(row.keybenefits9),
    this.form.controls['keybenefit10'].setValue(row.keybenefits10),
    this.form.controls['keybenefit11'].setValue(row.keybenefits11),
    this.form.controls['keybenefit12'].setValue(row.keybenefits12),
    this.imageurl = row.imageurl;
    this.amcid = row.amcid;
    // console.log(this.isEdited);
  }

  saveImage(event: any) : void {
    this.selectedFile = event.target.files[0];
    // console.log(this.selectedFile);
    
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

  deleteProduct(row: any): void {

  }

  updateProduct(): void {
    const jsondata = {
      'amcname' : this.form.controls['amcname'].value,
      'amcheading' : this.form.controls['amcheading'].value,
      'amccovers' : this.form.controls['amccovers'].value,
      'salesprice' : this.form.controls['salesprice'].value,
      'keybenefit1' : this.form.controls['keybenefit1'].value,
      'keybenefit2' : this.form.controls['keybenefit2'].value,
      'keybenefit3' : this.form.controls['keybenefit3'].value,
      'keybenefit4' : this.form.controls['keybenefit4'].value,
      'keybenefit5' : this.form.controls['keybenefit5'].value,
      'keybenefit6' : this.form.controls['keybenefit6'].value,
      'keybenefit7' : this.form.controls['keybenefit7'].value,
      'keybenefit8' : this.form.controls['keybenefit8'].value,
      'keybenefit9' : this.form.controls['keybenefit9'].value,
      'keybenefit10' : this.form.controls['keybenefit10'].value,
      'keybenefit11' : this.form.controls['keybenefit11'].value,
      'keybenefit12' : this.form.controls['keybenefit12'].value,
      'imageurl' : this.imageurl,
      'amcid' : this.amcid,
      'userid': localStorage.getItem('userid')
    }
    this.service.updateProduct(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.toaster.success('Product Updated Successfully', 'SUCCESSFULLY UPDATED');
        this.getProductList();
        this.clear();
      }
      else {
        this.toaster.error('Product Updating Failed', 'ERROR WHILE UPDATING');
      }
    });
  }

  save(): void {
    const jsondata = {
      'amcname' : this.form.controls['amcname'].value,
      'amcheading' : this.form.controls['amcheading'].value,
      'amccovers' : this.form.controls['amccovers'].value,
      'salesprice' : this.form.controls['salesprice'].value,
      'keybenefit1' : this.form.controls['keybenefit1'].value,
      'keybenefit2' : this.form.controls['keybenefit2'].value,
      'keybenefit3' : this.form.controls['keybenefit3'].value,
      'keybenefit4' : this.form.controls['keybenefit4'].value,
      'keybenefit5' : this.form.controls['keybenefit5'].value,
      'keybenefit6' : this.form.controls['keybenefit6'].value,
      'keybenefit7' : this.form.controls['keybenefit7'].value,
      'keybenefit8' : this.form.controls['keybenefit8'].value,
      'keybenefit9' : this.form.controls['keybenefit9'].value,
      'keybenefit10' : this.form.controls['keybenefit10'].value,
      'keybenefit11' : this.form.controls['keybenefit11'].value,
      'keybenefit12' : this.form.controls['keybenefit12'].value,
      'imageurl' : this.imageurl,
      'userid': localStorage.getItem('userid')
    }
    this.service.saveproduct(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.toaster.success('Product saved Successfully', 'SUCCESSFULLY SAVED');
      }
      else {
        this.toaster.error('Product save Failed', 'ERROR WHILE SAVING');
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
  }
}