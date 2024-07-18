import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SidenavbarService } from 'src/app/sidenavbar/sidenavbar.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { DashboardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private service: DashboardService, private toaster: ToastrService) { }

  form!: FormGroup;
  ngOnInit(): void {

    this.form = new FormGroup({
      title: new FormControl(null),
      desc: new FormControl(null),
      // email: new FormControl(null),

    });


  }


  save(): void {
    const data = {
      'title': this.form.controls['title'].value,
      'desc': this.form.controls['desc'].value,
      // 'mobile': this.form.controls['mobile'].value,

    }
    this.service.registration(data).subscribe(data => {
      if (data) {
        console.log("employee successfullt added ", data);
        this.toaster.success('Product saved Successfully', 'SUCCESSFULLY SAVED');
        // this.clear();
        // this.getEmployeeList();
      }
      else {
        this.toaster.error('Employee save Failed', 'ERROR WHILE SAVING');
      }
      console.log("data post employee ", data);

    });
  }

}
