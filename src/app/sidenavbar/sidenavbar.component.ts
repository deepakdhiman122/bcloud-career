import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavbarService } from './sidenavbar.service';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent {

  navbardata: any = [];
  navdata: any = [];
  navchilddata: any = [];


  constructor(public loginroute: Router, protected service: SidenavbarService) { }
  [x: string]: any;
  @Input() sideNavStatus: boolean = false;
  ngOnInit(): void {
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
    this.getnavdata();
  }

  getnavdata(): void {
    const jsondata = {
      'rollid': localStorage.getItem('rollid')
    };
    this.service.getnavdata(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.navbardata = data.response.navbarList;
        for (let nvb of this.navbardata) {
          if (nvb.parentid === 0) {
            this.navdata.push(nvb);
          } else if (nvb.parentid !== 0) {
            this.navchilddata.push(nvb);
          }
        }
        console.log(this.navdata);
        console.log(this.navchilddata);
      }
      else {
        alert('Saved Faluire');
      }
    });
  }

  logout(): void {
    localStorage.clear();
    localStorage.setItem('islogedin', 'No');
    this.loginroute.navigate(['']);
  }

  DarkMode() {
    const main = document.querySelector("main");
    main?.classList.toggle("dark");
    if (main?.classList.contains("dark")) {
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.setItem("mode", "light");
    }
  }
}