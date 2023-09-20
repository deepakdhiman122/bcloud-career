import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddemployeeService } from './addemployee.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent {

  form!: FormGroup;

  isEdited: any = 'NO';
  imageurl: any;
  selectedFile!: File;

  employeelist: any = [];
  employeeid: any;
  search: any;

  constructor(private service: AddemployeeService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      employeename: new FormControl(null),
      mobileno: new FormControl(null),
      email: new FormControl(null),
      currentaddress: new FormControl(null),
      permanentaddress: new FormControl(null),
      employeeroll: new FormControl(null)
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
    this.getEmployeeList();
  }

  getEmployeeList(): void {
    this.service.getEmployeeList().subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.employeelist = data.response.employeelist;
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
    this.form.controls['employeename'].setValue(row.name);
    this.form.controls['mobileno'].setValue(row.brand);
    this.form.controls['email'].setValue(row.productcategory);
    this.form.controls['currentaddress'].setValue(row.details);
    this.form.controls['permanentaddress'].setValue(row.mrp);
    this.form.controls['employeeroll'].setValue(row.productrating);
    this.employeeid = row.employeeid
    console.log(this.isEdited);
  }

  saveImage(event: any) : void {
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
      'employeename': this.form.controls['employeename'].value,
      'mobileno': this.form.controls['mobileno'].value,
      'email': this.form.controls['email'].value,
      'currentaddress': this.form.controls['currentaddress'].value,
      'permanentaddress': this.form.controls['permanentaddress'].value,
      'employeeroll': this.form.controls['employeeroll'].value,
      'userid': localStorage.getItem('userid'),
      'employeeid' : this.employeeid
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
      'employeename': this.form.controls['employeename'].value,
      'mobileno': this.form.controls['mobileno'].value,
      'email': this.form.controls['email'].value,
      'currentaddress': this.form.controls['currentaddress'].value,
      'permanentaddress': this.form.controls['permanentaddress'].value,
      'employeeroll': this.form.controls['employeeroll'].value,
      'userid': localStorage.getItem('userid')
    }
    this.service.saveEmployee(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.clear();
        this.getEmployeeList();
        this.toaster.success('Product saved Successfully', 'SUCCESSFULLY SAVED');
      }
      else {
        this.toaster.error('Product save Failed', 'ERROR WHILE SAVING');
      }
    });
  }
  clear(): void {
    this.form.controls['employeename'].setValue(null);
    this.form.controls['mobileno'].setValue(null);
    this.form.controls['email'].setValue(null);
    this.form.controls['currentaddress'].setValue(null);
    this.form.controls['permanentaddress'].setValue(0);
    this.form.controls['employeeroll'].setValue(0);
  }
}