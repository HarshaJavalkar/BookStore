import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  username: string;

  user = { username: '' };
  salesCart = [];
  salesCount;
  sum = 0;
  countUsers = 0;
  temp = '';

  constructor(private ds: DataService) {
    this.username = localStorage.getItem('username');
  }

  ngOnInit(): void {
    this.user.username = localStorage.getItem('username');

    this.ds.getSales(this.user).subscribe(
      (res) => {
        this.salesCart = res['message'];

        console.log(this.salesCart);
        this.salesCount = this.salesCart.length;

        for (let i = 0; i < this.salesCart.length; i++) {
          this.sum = this.sum + this.salesCart[i].price;
        }

        if (this.salesCount != 0) {
          this.temp = this.salesCart[0].orderPlacedBy;
          this.countUsers = 1;
        }
        for (let i = 0; i < this.salesCart.length; i++) {
          if (this.temp == this.salesCart[i].orderPlacedBy) {
            this.temp = this.salesCart[i].orderPlacedBy;
          } else {
            this.countUsers = this.countUsers + 1;
          }
        }
      },

      (err) => {}
    );
  }
}
