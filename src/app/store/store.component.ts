import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { required } from 'joi';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  subscription: Subscription;
  clickedCard: number;
  constructor(
    private ar: ActivatedRoute,
    private ds: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  booksAvailable: Array<any>;
  booksUpdatedList = [];
  filteredBooks: Array<any>;

  title: string;

  prodinfo(bookId) {
    this.router.navigateByUrl(`productinfo/${bookId}`);
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
            this.toastr.success('Product is  already exist in cart');
          }
        },

        (err) => {}
      );
    } else {
      alert('Please Register ');
    }
  }

  // wishlist

  clickedWishlist(book) {
    let status = localStorage.getItem('username');

    if (status) {
      book.userAdded = status;

      //  console.log(book)

      this.ds.moveToWishlistFromStore(book).subscribe(
        (res) => {
          console.log(res['message']);

          if (res['message'] == 'product added to wishlist') {
            alert('product added to WishList');
          } else {
            alert('Product is  already exist in wishlist');
          }
        },

        (err) => {}
      );
    } else {
      alert('Please Login or Register ');
    }
  }

  // wishlist end

  ngOnInit(): void {
    this.ar.paramMap.subscribe((data) => {
      this.clickedCard = data['params'].id;
    });

    this.clickedCard = +this.clickedCard;
    this.ds.getAllProductstoUsers().subscribe(
      (res) => {
        this.booksAvailable = res['message'];
        console.log('checkpoint-1', this.booksAvailable);

        // this.booksUpdatedList.length=this.booksAvailable.length;

        for (let i = 0; i < this.booksAvailable.length; i++) {
          if (this.booksAvailable[i].active)
            this.booksUpdatedList.push(this.booksAvailable[i]);
        }

        console.log('checkpoint-2', this.booksUpdatedList);

        this.booksUpdatedList = this.booksAvailable.filter(function (el) {
          return el != null;
        });
        // console.log("last",this.booksUpdatedList)

        switch (this.clickedCard) {
          case 1: {
            this.filteredBooks = this.booksAvailable.filter((book) => {
              return book.type == 'Adventure';
            });

            break;
          }

          case 2: {
            this.filteredBooks = this.booksUpdatedList.filter((book) => {
              return book.type == 'Biography';
            });

            break;
          }

          case 3: {
            this.filteredBooks = this.booksUpdatedList.filter((book) => {
              return book.type == 'Business';
            });
            break;
          }

          case 4: {
            this.filteredBooks = this.booksUpdatedList.filter((book) => {
              return book.type == 'Computing';
            });

            break;
          }

          case 5: {
            this.filteredBooks = this.booksUpdatedList.filter((book) => {
              return book.type == 'Computing';
            });

            break;
          }

          case 6: {
            this.filteredBooks = this.booksUpdatedList.filter((book) => {
              return book.type == 'Fiction';
            });

            break;
          }

          case 7: {
            this.filteredBooks = this.booksUpdatedList.filter((book) => {
              return book.type == 'Humour';
            });

            break;
          }

          case 8: {
            this.filteredBooks = this.booksUpdatedList.filter((book) => {
              return book.type == 'Politics';
            });

            break;
          }

          case 9: {
            this.filteredBooks = this.booksUpdatedList.filter((book) => {
              return book.type == 'Religion';
            });

            break;
          }

          case 10: {
            this.filteredBooks = this.booksUpdatedList.filter((book) => {
              return book.type == 'Romance';
            });

            break;
          }

          case 11: {
            this.filteredBooks = this.booksUpdatedList.filter((book) => {
              return book.type == 'Science';
            });

            break;
          }
        }
      },

      (err) => {}
    );
  }
}
