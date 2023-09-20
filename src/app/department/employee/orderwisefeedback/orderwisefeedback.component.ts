import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderwisefeedbackService } from './orderwisefeedback.service';

@Component({
  selector: 'app-orderwisefeedback',
  templateUrl: './orderwisefeedback.component.html',
  styleUrls: ['./orderwisefeedback.component.css']
})
export class OrderwisefeedbackComponent {

  
  navbardata: any = [];
  navdata: any = [];
  navchilddata: any = [];
  form!: FormGroup;
  
  constructor(public loginroute: Router, protected service: OrderwisefeedbackService, private toaster: ToastrService) { }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      usercreationcoins: new FormControl(0),
      userrefercoins:    new FormControl(0)
    });
    let mode = localStorage.getItem("mode");
    if(mode && mode === "dark"){
      const  main = document.querySelector("main");
      main?.classList.toggle("dark");
    }
    let status = localStorage.getItem("status");
    if(status && status === 'close'){
      const Sidenav = document.querySelector("nav");
      Sidenav?.classList.toggle("close");
    }
    this.getnavdata();
  }

  getnavdata(): void {
    const jsondata = {
      'rollid' : localStorage.getItem('rollid')
    };
    this.service.getnavdata(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.navbardata = data.response.navbarList;
        for(let nvb of this.navbardata){
          if(nvb.parentid === 0){
            this.navdata.push(nvb);
          } else if(nvb.parentid !== 0){
            this.navchilddata.push(nvb);
          }
        }
        console.log(this.navdata);
        console.log(this.navchilddata);
      }
      else{
        alert('Saved Faluire');
      }
    });
  }
  DarkMode(){
    const  main = document.querySelector("main");
    main?.classList.toggle("dark");
    if(main?.classList.contains("dark")){
      localStorage.setItem("mode","dark");
    }else{
      localStorage.setItem("mode","light");
    }
  }

  SideToggle(){
    const Sidenav = document.querySelector("nav");
    Sidenav?.classList.toggle("close");
    if(Sidenav?.classList.contains("close")){
      localStorage.setItem("status","close");
    }else{
      localStorage.setItem("status","open");
    }
  }
  
  logout(): void{
    localStorage.clear();
    localStorage.setItem('loggedin', 'No');
    this.loginroute.navigate(['']);
  }

  saveCoins(): void {
    const jsondata = {
      'usercreationcoins' : this.form.controls['usercreationcoins'].value,
      'userrefercoins'    : this.form.controls['userrefercoins'].value
    }
    this.service.saveCoinManagement(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.toaster.success("Save Successfull");
        this.form.controls['usercreationcoins'].setValue(0);
        this.form.controls['userrefercoins'].setValue(0);
      }
      else{
        this.toaster.error("Saved Faluire");
      }
    });
  }

}