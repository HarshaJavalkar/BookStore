import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';

@Component({
  selector: 'app-productinfo',
  templateUrl: './productinfo.component.html',
  styleUrls: ['./productinfo.component.css'],
})
export class ProductinfoComponent implements OnInit {
  productid;
  prodobj = { id: Number };
  product;
  constructor(
    private ar: ActivatedRoute,
    private ds: DataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.ar.paramMap.subscribe((data) => {
      this.productid = data['params'].id;
    });
    this.prodobj.id = this.productid;

    this.ds.getProductwithid(this.prodobj).subscribe(
      (res) => {
        this.product = res['message'];
      },
      (err) => {}
    );
  }

  clickedCart(book) {
    let status = localStorage.getItem('username');

    if (status) {
      book.userAdded = status;

      //  console.log(book)

      this.ds.addtoCart(book).subscribe(
        (res) => {
          if (res['message'] == 'product added to cart') {
            this.toastr.success('product added successfully');
          } else {
            // this.toastr.warning("Product is  already exist in cart")

            this.toastr.warning('Product is  already exist in cart');
          }
        },

        (err) => {}
      );
    } else {
      this.toastr.error('Please Register ');
    }
  }

  clickedWishlist(book) {
    let status = localStorage.getItem('username');

    if (status) {
      book.userAdded = status;

      //  console.log(book)

      this.ds.moveToWishlistFromStore(book).subscribe(
        (res) => {
          console.log(res['message']);

          if (res['message'] == 'product added to wishlist') {
            this.toastr.success('product added to WishList');
          } else {
            this.toastr.warning('Product is  already exist in wishlist');
          }
        },

        (err) => {}
      );
    } else {
      this.toastr.warning('Please Register ');
    }
  }
}
