import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  lists = ['User', 'Admin'];
  loginCheck: Boolean = false;
  isFormSubmitted = false;
  toastMessage: String = ' ';
  

  subscription: Subscription;
  loginObj;
  loginStatus: boolean = localStorage.getItem('username') ? true : false;

  constructor(private us: DataService, private router: Router,private toastr:ToastrService) {}
  form;
  ngOnInit(): void {
 
    this.form = new FormGroup({
     
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),

      User: new FormControl(false),
      //  Admin:new FormControl(false),
    });
  }

  loginData() {
    this.loginObj = this.form.value;

    if (this.loginObj.User == 'User') {
      this.userLogin();
    }

    if (this.loginObj.User == 'Admin') {
      this.adminLogin();
    }

    else{
     this.toastr.error('Please select Type of Login')
    }
  }

  userLogin() {
    this.subscription = this.us.loginUser(this.loginObj).subscribe(
      (res) => {
        console.log("ed",res['message']);

        if (res['message'] == 'success') {
         
          this.toastr.success("Successfull logged In!'");

          localStorage.setItem('token', res['token']);

          this.loginStatus = true;
          localStorage.setItem('username', res['userObj']);
          localStorage.setItem('Usertype', this.loginObj.User);

          this.loginCheck = true;
          this.us.sendloginState(this.loginStatus);
          this.router.navigateByUrl(`/useraccount/${this.loginObj.username}`);
        }

        if (res['message'] == 'Invalid username') {
          // alert('Username is not valid Please Register');

          this.toastr.error("Username is not valid Please Register");

          // this.router.navigateByUrl('/register');
        }

        if (res['message'] == 'Invalid Password') {
       
          this.toastr.error('Incorrect  Password');
        }
      },

      (err) => {

        this.toastr.error('Maintainance issue')
      }
    );
  }

  adminLogin() {
    this.us.loginAdmin(this.loginObj).subscribe(
      (res) => {
        // console.log(res['message']);

        if (res['message'] == 'success') {
          this.toastr.success('Login Success')

          this.router.navigateByUrl(`/adminaccount/${this.loginObj.username}`);

          localStorage.setItem('token', res['token']);
          localStorage.setItem('username', res['adminObj']);
          localStorage.setItem('Usertype', this.loginObj.User);

          this.loginStatus = true;
          this.us.sendloginState(this.loginStatus);
        }

        if (res['message'] == 'Invalid username') {
          this.toastr.error("Username is not valid Please Register");
          

        }

        if (res['message'] == 'Invalid Password') {
         
          this.toastr.error('Incorrect  Password')
        }
      },

      (err) => {}
    );
  }

  redirectRegister() {
    this.router.navigateByUrl('/register');
  }
}
