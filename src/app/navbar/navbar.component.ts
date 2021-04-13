import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { boolean } from 'joi';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  username: any;
  logStatus: boolean;
  $subs: Subscription;

  status: boolean = false;
  adminName: string;

  constructor(
    private ds: DataService,
    private router: Router,
    private ar: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ar.paramMap.subscribe((data) => {
      this.adminName = data['param'];
    });
    this.$subs = this.ds.receiveloginState().subscribe((d) => {
      this.logStatus = d;
    });
  }

  loginType() {
    if (localStorage.getItem('Usertype') == 'User') {
      return 1;
    } else {
      return 0;
    }
  }

  ngOnDestroy() {
    this.$subs.unsubscribe();
  }

  redirect() {
    this.router.navigateByUrl('/home');
  }

  loggedin() {
    this.username = localStorage.getItem('username');

    return localStorage.getItem('token');
  }

  usertype() {
    let type = localStorage.getItem('Usertype');
    if (type == 'Admin') {
      return 0;
    }
    if (type == 'User') {
      return 1;
    } else {
      return 'logout';
    }
  }

  logOutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('Usertype');
    this.logStatus = false;

    this.router.navigateByUrl('/home');
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }

  toggleMenu() {
    this.status = !this.status;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigateByUrl('/login');
  }
}
