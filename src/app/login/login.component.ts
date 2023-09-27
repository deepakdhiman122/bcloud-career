import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginInfo: any = [];
  id: any;

  constructor(private service: LoginService, private route: Router, private toaster: ToastrService) { }

  loginForm!: FormGroup;
  signupForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    });

    this.signupForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required,),
      mobile: new FormControl('', Validators.required,),
      address: new FormControl('', Validators.required,),
      district: new FormControl('', Validators.required,),
      refercode: new FormControl(''),
      userrollid: new FormControl('', Validators.required,),
    }
      // }, [this.passwordMatchValidator]);
    )
  };

  @ViewChild('loginPage', { static: true }) loginPage!: ElementRef<HTMLElement>;
  @ViewChild('loginBtn', { static: true }) loginBtn!: ElementRef<HTMLElement>;
  @ViewChild('signupBtn', { static: true }) signupBtn!: ElementRef<HTMLElement>;
  @ViewChild('signupLink', { static: true }) signupLink!: ElementRef<HTMLAnchorElement>;
  @ViewChild('loginText', { static: true }) loginText!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.signupBtn.nativeElement.addEventListener('click', () => {
      this.loginPage.nativeElement.style.marginLeft = '-50%';
      this.loginText.nativeElement.style.marginLeft = '-50%';
    });

    this.signupLink.nativeElement.addEventListener('click', (event) => {
      event.preventDefault();
      this.signupBtn.nativeElement.click();
    });

    this.loginBtn.nativeElement.addEventListener('click', () => {
      this.loginPage.nativeElement.style.marginLeft = '0';
      this.loginText.nativeElement.style.marginLeft = '0';
    });
  }

  // passwordMatchValidator = (form: FormGroup) => {
  //   const password = form.get('password');
  //   const confirmPassword = form.get('confirmPassword');
  //   return password && confirmPassword && password.value !== confirmPassword.value
  //   ? {mismatch: true}
  //   : null;
  // }
  //   passwordMatchValidator(form: FormGroup) {
  //     const password = form.get('password');
  //     const confirmPassword = form.get('confirmPassword');
  //     return password && confirmPassword && password.value !== confirmPassword.value
  //     ? {mismatch: true}
  //     : null;
  // }
  // passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  //   const password = control.get('password');
  //   const confirmPassword = control.get('confirmPassword');
  //   return password && confirmPassword && password.value !== confirmPassword.value
  //     ? { mismatch: true }
  //     : null;
  // }

  // LoginFormFunction() {
  //   const jsonbody = {
  //     "userid": this.loginForm.controls['email'].value,
  //     "password": this.loginForm.controls['password'].value
  //   }
  //   this.loginForm = new FormGroup({
  //     email: new FormControl('', [Validators.required]),
  //     password: new FormControl('', Validators.required)
  //   });
  //   console.log("loginForm", this.loginForm);

  //   this.service.validateLogin(this.loginForm.value).subscribe(data => {
  //     alert("working login functions")
  //     console.log(data);

  //     // if (data.status.responseStatus === "Success") {
  //     //   this.loginInfo = data.response.logininfo;
  //     //   // console.log(this.loginInfo);
  //     //   if (this.loginInfo[0].userrollid === 'customer') {
  //     //     localStorage.setItem('islogedin', 'true');
  //     //     localStorage.setItem('userid', this.loginInfo[0].userid);
  //     //     localStorage.setItem('rollid', this.loginInfo[0].userrollid);
  //     //     this.getUserDetails();
  //     //     this.toaster.success("Login Successfully");
  //     //     this.route.navigate(['/cart']);
  //     //   } else if (this.loginInfo[0].userrollid === 'servicesngineer') {
  //     //     localStorage.setItem('islogedin', 'true');
  //     //     localStorage.setItem('userid', this.loginInfo[0].userid);
  //     //     localStorage.setItem('rollid', this.loginInfo[0].userrollid);
  //     //     this.toaster.success("Login Successfully");
  //     //     this.route.navigate(['/employeedashboard']);
  //     //   } else if (this.loginInfo[0].userrollid === 'admin') {
  //     //     localStorage.setItem('islogedin', 'true');
  //     //     localStorage.setItem('userid', this.loginInfo[0].userid);
  //     //     localStorage.setItem('rollid', this.loginInfo[0].userrollid);
  //     //     this.toaster.success("Login Successfully");
  //     //     this.route.navigate(['/dashboard']);
  //     //   } else {
  //     //     this.toaster.warning("INVAILID!! Contact IT Team.");
  //     //     ("Login Successfully");
  //     //   }
  //     // }
  //     // else {
  //     //   console.log(Response.error);
  //     // }
  //   })
  // }

  userdetails: any = [];
  walletBalance: any;
  couponBalance: any;
  getUserDetails(): void {
    const jsondata = {
      'userid': localStorage.getItem('userid')
    }
    this.service.getUserDetails(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        this.userdetails = data.response.userdetails;
        this.walletBalance = this.userdetails[0].walletbalance;
        this.couponBalance = this.userdetails[0].couponcode;
        localStorage.setItem('walletBalance', this.walletBalance);
        localStorage.setItem('couponBalance', this.couponBalance);
      }
      else {
        alert('Saved Faluire');
      }
    });
  }

  // signUpFunction() {
  //   this.service.registration(this.signupForm.value).subscribe(data => {
  //     if (data.status.responseStatus === 'Success') {
  //       this.toaster.success("Login Now, Your MobileNo is your Username & Date Of Birth Your Password");
  //     }
  //     else{
  //       console.log(data.error.error);
  //     }
  //   })
  // }

  // for signUp login 
  signUpFunction() {
    console.log("signUp form", this.signupForm.value);
    if (this.signupForm.value) {
      this.service.registration(this.signupForm.value).subscribe(data => {
        if (data.message === 'success') {
          this.toaster.success("Login Now, Your Email is your Email & Password Your Password");
        }
        else {
          console.log("some error");
        }
      }
      )
    } else {
      this.toaster.warning("Please enter valid data !")
    }
  }

  // for  login user

  LoginFormFunction() {
    if (this.loginForm.value) {
      this.service.validateLogin(this.loginForm.value).subscribe(data => {
        console.log("login data ", data);

        if (data.message === "success") {
          this.loginInfo = data.result;
          console.log("loigininfo", this.loginInfo);
          if (this.loginInfo.userrollid === 'customer') {
            localStorage.setItem('islogedin', 'true');
            localStorage.setItem('userid', this.loginInfo._id);
            localStorage.setItem('rollid', this.loginInfo.userrollid);
            this.getUserDetails();
            this.toaster.success("Login Successfully");
            this.route.navigate(['/cart']);
          } else if (this.loginInfo.userrollid === 'servicesngineer') {
            localStorage.setItem('islogedin', 'true');
            localStorage.setItem('userid', this.loginInfo._id);
            localStorage.setItem('rollid', this.loginInfo.userrollid);
            this.toaster.success("Login Successfully");
            this.route.navigate(['/employeedashboard']);
          } else if (this.loginInfo.userrollid === 'admin') {
            localStorage.setItem('islogedin', 'true');
            localStorage.setItem('userid', this.loginInfo._id);
            localStorage.setItem('rollid', this.loginInfo.userrollid);
            this.toaster.success("Login Successfully");
            this.route.navigate(['/dashboard']);
          } else {
            this.toaster.warning("INVAILID!! Contact IT Team.");
            ("Login Successfully");
          }
        }
        else {
          console.log(Response.error);
        }
      }
      )


      // if (this.loginForm.value) {
      //   this.service.loginPost(this.loginForm.value).subscribe(res => {
      //     this.route.navigate(['/dashboard'])
      //     this.toaster.success("User Login Successfully !")
      //     console.log("signUp Successfully", res);
      //   })
      // } else {
      //   this.toaster.warning("Please enter valid data !")
      // }
    }
  }
}

