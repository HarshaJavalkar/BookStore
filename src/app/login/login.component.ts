import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private us: DataService, private router: Router) {}
  form;
  ngOnInit(): void {
    // $('.showtoast').click(function () {
    //   $('.toast').toast('show');
    // });
    this.form = new FormGroup({
      // user: new FormControl('',[
      //      Validators.required
      // ]),

      // admin: new FormControl('',[
      //   Validators.required
      // ]),
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
  }

  userLogin() {
    this.subscription = this.us.loginUser(this.loginObj).subscribe(
      (res) => {
        console.log(res['message']);

        if (res['message'] == 'success') {
          this.toastMessage = 'Successfull logged In!';

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

          this.toastMessage = 'Username is not valid Please Register';

          // this.router.navigateByUrl('/register');
        }

        if (res['message'] == 'Invalid Password') {
          this.toastMessage = 'Incorrect  Password';
        }
      },

      (err) => {
        this.toastMessage = 'Maintainance issue';
      }
    );
  }

  adminLogin() {
    this.us.loginAdmin(this.loginObj).subscribe(
      (res) => {
        console.log(res['message']);

        if (res['message'] == 'success') {
          this.toastMessage = '';

          this.router.navigateByUrl(`/adminaccount/${this.loginObj.username}`);

          localStorage.setItem('token', res['token']);
          localStorage.setItem('username', res['adminObj']);
          localStorage.setItem('Usertype', this.loginObj.User);

          this.loginStatus = true;
          this.us.sendloginState(this.loginStatus);
        }

        if (res['message'] == 'Invalid username') {
          this.toastMessage = 'Username is not valid Please Register';

          // this.router.navigateByUrl('/register');

          // this.router.navigateByUrl("/register")
        }

        if (res['message'] == 'Invalid Password') {
          this.toastMessage = 'Incorrect  Password';
        }
      },

      (err) => {}
    );
  }

  redirectRegister() {
    this.router.navigateByUrl('/register');
  }
}
