import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  booksAvailable: any;
  searchText;
  toast = true;
  username;

  product: any;

  clickedToast() {
    this.toast = !this.toast;
  }
  navigatePremium() {
    this.router.navigateByUrl('/premium');
  }

  // initialize and show Bootstrap 4 toast

  constructor(
    private ds: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  clickedProduct(id) {
    this.router.navigateByUrl(`productinfo/${id}`);
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.ds.getAllProductstoUsers().subscribe(
      (res) => {
        if (
          res['message'] == 'Session is Expired.. Please relogin to continue'
        ) {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('Usertype');
          this.router.navigateByUrl('/login');
          alert('Session Expired Please relogin');
        }
        if (res['message'] == 'Unauthorized access') {
          alert(res['message']);
        } else this.booksAvailable = res['message'];
      },
      (err) => {}
    );
  }
}
