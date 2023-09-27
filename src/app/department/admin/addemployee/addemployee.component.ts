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
  successMessage: any = [];
  msg: any = [];

  employeelist: any = [];
  employeeid: any;
  search: any;

  constructor(private service: AddemployeeService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null),
      mobile: new FormControl(null),
      email: new FormControl(null),
      address: new FormControl(null),
      district: new FormControl(null),
      userrollid: new FormControl(null),
      password: new FormControl(null)
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
      console.log(data);

      if (data.statusCode == 200) {
        this.toaster.success('Getting Employee List Successfully', 'SUCCESSFULLY SAVED');
        this.employeelist = data.result;
      } else {
        this.toaster.error('Getting No Employee List', 'ERROR WHILE');
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
    this.form.controls['email'].setValue(row.email);
    this.form.controls['username'].setValue(row.username);
    this.form.controls['mobile'].setValue(row.mobile);
    this.form.controls['address'].setValue(row.address);
    this.form.controls['district'].setValue(row.district);
    this.form.controls['password'].setValue(row.password);
    this.form.controls['userrollid'].setValue(row.userrollid);
    this.employeeid = row._id
    console.log("employee id", this.employeeid);

    console.log(this.isEdited);
  }

  saveImage(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.service.onImageUpload(uploadImageData).subscribe(data => {
      if (data.message === "success") {
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
      'email': this.form.controls['email'].value,
      'username': this.form.controls['username'].value,
      'mobile': this.form.controls['mobile'].value,
      'address': this.form.controls['address'].value,
      'district': this.form.controls['district'].value,
      'password': this.form.controls['password'].value,
      'userrollid': this.form.controls['userrollid'].value,
      // 'userid': localStorage.getItem('userid'),
      'employeeid': this.employeeid
    }
    this.service.updateProduct(jsondata).subscribe(data => {
      console.log("updated", data);
      this.successMessage = data
      this.msg = this.successMessage.message
      if (this.successMessage.message === 'success') {
        this.clear();
        this.getEmployeeList();
        this.toaster.success('Product Updated Successfully', 'SUCCESSFULLY UPDATED');
      }
      else {
        this.toaster.error('Product Updating Failed', 'ERROR WHILE UPDATING');
      }
    });
  }

  save(): void {
    const data = {
      'email': this.form.controls['email'].value,
      'username': this.form.controls['username'].value,
      'mobile': this.form.controls['mobile'].value,
      'address': this.form.controls['address'].value,
      'district': this.form.controls['district'].value,
      'password': this.form.controls['password'].value,
      'userrollid': this.form.controls['userrollid'].value,
      'userid': localStorage.getItem('userid')
    }
    this.service.saveEmployee(data).subscribe(data => {
      if (data.statusCode === 201) {
        this.toaster.success('Product saved Successfully', 'SUCCESSFULLY SAVED');
        console.log("employee successfullt added ", data);
        this.clear();
        this.getEmployeeList();
      }
      else {
        this.toaster.error('Employee save Failed', 'ERROR WHILE SAVING');
      }
      console.log("data post employee ", data);

    });
  }
  clear(): void {
    this.form.controls['email'].setValue(null);
    this.form.controls['username'].setValue(null);
    this.form.controls['mobile'].setValue(null);
    this.form.controls['address'].setValue(null);
    this.form.controls['district'].setValue(null);
    this.form.controls['password'].setValue(null);
    this.form.controls['userrollid'].setValue(0);
  }
}