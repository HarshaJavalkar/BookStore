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
        this.salesCount = this.salesCart.length;
        for (let i = 0; i < this.salesCart.length; i++) {
          this.sum = Math.round(this.sum + this.salesCart[i].price);
        }
        if (this.salesCount != 0) {
          this.temp = this.salesCart[0].orderPlacedBy;
          this.countUsers = 1;
        }
        this.countUsers = 1;
        // Pick all elements one by one
        for (let i = 1; i < this.salesCart.length; i++) {
          let j = 0;
          for (j = 0; j < i; j++)
            if (
              this.salesCart[i].orderPlacedBy ===
              this.salesCart[j].orderPlacedBy
            )
              break;
          // If not printed earlier, then print it
          if (i === j) this.countUsers++;
        }
      },

      (err) => {}
    );
  }
}