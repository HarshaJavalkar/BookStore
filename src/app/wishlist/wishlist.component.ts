import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private ds: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  wishlist: any;
  wishlistIsEmpty: boolean;
  userObj = { username: '' };
  ngOnInit(): void {
    this.userObj.username = localStorage.getItem('username');

    this.ds.getproductsFromWishlist(this.userObj).subscribe(
      (res) => {
        if (
          res['message'] == 'Session is Expired.. Please relogin to continue'
        ) {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('Usertype');
          this.router.navigateByUrl('/login');
          this.toastr.warning('Session Expired Please relogin');
        }
        if (res['message'] == 'Unauthorized access') {
          this.toastr.warning(res['message']);
        } else {
          this.wishlist = res['message'];

          if (this.wishlist.length == 0) {
            this.wishlistIsEmpty = false;
          } else {
            this.wishlistIsEmpty = true;
          }
          // console.log("in wishlist",this.wishlist)
        }
      },
      (err) => {}
    );
  }

  deleteFromWishlist(wish) {
    this.ds.deleteProductFromWishlist(wish).subscribe(
      (res) => {
        if (
          res['message'] == 'Session is Expired.. Please relogin to continue'
        ) {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('Usertype');
          this.router.navigateByUrl('/login');
          this.toastr.warning('Session Expired Please relogin');
        }
        if (res['message'] == 'Unauthorized access') {
          this.toastr.warning(res['message']);
        } else {
          this.toastr.success(res['message']);
        }
      },
      (err) => {}
    );

    window.location.reload();
  }

  moveToCartFromWishlist(book) {
    this.ds.moveToCartFromWishlist(book).subscribe(
      (res) => {
        if (
          res['message'] == 'Session is Expired.. Please relogin to continue'
        ) {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('Usertype');
          this.router.navigateByUrl('/login');
          this.toastr.warning('Session Expired Please relogin');
        }
        if (res['message'] == 'Unauthorized access') {
          this.toastr.warning(res['message']);
        } else {
          this.toastr.success(res['message']);
        }
      },
      (err) => {}
    );
  }
}
