import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CareerService } from './career.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent {

  careerForm!: FormGroup;
  searchText: any;
  page: number = 1;

  constructor(private service: CareerService, private toaster: ToastrService, private router: Router) { }

  ngOnInit() {
    this.careerForm = new FormGroup({
      firstName: new FormControl(''),
      email: new FormControl(''),
      country: new FormControl(''),
      phoneNumber: new FormControl(''),
      applied: new FormControl(''),
      selectType: new FormControl(''),
      desc: new FormControl('')
    })

    this.getCareerData();
  }


  appliedForm() {
    this.service.careePost(this.careerForm.value).subscribe((data) => {
      if (data) {
        console.log("get career post data:", data);

        this.toaster.success("Applied Successfully");
        this.getCareerData();
      }
      else {
        console.log("some error:", data.msg);
      }
    })
  }

  careerData: any;
  getCareerData() {
    this.service.getCareer().subscribe((data) => {
      this.careerData = data.data
      console.log(data);

    })
  }

  viewJobDetails(id: string) {
    this.router.navigate(['/jonDetails', id]);
  }

  // careerData_filter: any;
  // onSearch() {
  //   this.careerData_filter = this.careerData.filter((item: any) =>
  //     item.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }

}
