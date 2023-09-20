import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PopviewService } from './popview.service';
@Component({
  selector: 'app-popview',
  templateUrl: './popview.component.html',
  styleUrls: ['./popview.component.css']
})
export class PopviewComponent implements OnInit{
  
  form!: FormGroup;

  customerlist: any;
  product: any;
  imageurl1: any;
  imageurl2: any;
  imageurl3: any;
  selectedFile!: File;

  constructor(protected service: PopviewService, private toaster: ToastrService,
    ) { }
   
  productlist :any=[]
  ngOnInit(): void {
    this.form = new FormGroup({
      paymentmode: new FormControl('P'),
      orderstatus: new FormControl('R'),
      remarks: new FormControl(null),
      amountrecieved : new FormControl(null),
      billno : new FormControl(null)
    });
    this.getproduct();
   
  }

  saveImage1(event: any) : void {
    this.selectedFile = event.target.files[0];
    // console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.service.onImageUpload(uploadImageData).subscribe(data => {
      if (data.status === 200) {
        this.imageurl1 = this.selectedFile.name;
        this.toaster.success('Product Saved Successfull', 'SAVE SUCCESSFULL');
      }
      else {
        this.toaster.error('Product Save Faluire', 'ERROR WHILE PROCESS');
      }
    });
  }

  saveImage2(event: any) : void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.service.onImageUpload(uploadImageData).subscribe(data => {
      if (data.status === 200) {
        this.imageurl2 = this.selectedFile.name;
        this.toaster.success('Product Saved Successfull', 'SAVE SUCCESSFULL');
      }
      else {
        this.toaster.error('Product Save Faluire', 'ERROR WHILE PROCESS');
      }
    });
  }

  saveImage3(event: any) : void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.service.onImageUpload(uploadImageData).subscribe(data => {
      if (data.status === 200) {
        this.imageurl3 = this.selectedFile.name;
        this.toaster.success('Product Saved Successfull', 'SAVE SUCCESSFULL');
      }
      else {
        this.toaster.error('Product Save Faluire', 'ERROR WHILE PROCESS');
      }
    });
  }

  getproduct(): void{
    const jsondata ={
      "orderid":  localStorage.getItem("orderid"),
      "userid":localStorage.getItem("userid"),
    }
      this.service.getorderlist(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.productlist = data.response.orderList;
        // console.log(this.productlist)
        for(let c of this.productlist){
          c.subtotal = c.quantity * c.rate;
        }
        this.form.controls['paymentmode'].setValue(this.productlist[0].paymentstatus);
        if(this.productlist[0].orderstatus != 'O' || this.productlist[0].orderstatus != 'P') {
          this.form.controls['orderstatus'].setValue(this.productlist[0].orderstatus);
        }
        this.form.controls['amountrecieved'].setValue(this.productlist[0].amountrecieved);
        this.form.controls['billno'].setValue(this.productlist[0].billno);
        this.form.controls['remarks'].setValue(this.productlist[0].remarks);
        this.imageurl1 = this.productlist[0].preservicesimageurl;
        this.imageurl2 = this.productlist[0].postservicesimageurl;
        this.imageurl3 = this.productlist[0].billimageurl;
      } else {
        this.toaster.error('Getting Product List', 'ERROR WHILE');
      }
    });
  }
  subtotal: any;

  save(): void {
    const jsondata = {
      'paymentmode'    : this.form.controls['paymentmode'].value,
      'orderstatus'    : this.form.controls['orderstatus'].value,
      'amountrecieved' : this.form.controls['amountrecieved'].value,
      'billno'         : this.form.controls['billno'].value,
      'remarks'        : this.form.controls['remarks'].value,
      'imageurl1'      : this.imageurl1,
      'imageurl2'      : this.imageurl2,
      'imageurl3'      : this.imageurl3,
      'orderid'        : localStorage.getItem("orderid")
    }
    this.service.save(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.toaster.success('Status Updated', 'SAVED SUCCESSFULLY');
      } else {
        this.toaster.error('Getting Product List', 'ERROR WHILE');
      }
    })
  }

  clear(): void {
   
  }
}
