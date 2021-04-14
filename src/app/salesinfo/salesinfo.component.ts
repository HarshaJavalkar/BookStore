import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-salesinfo',
  templateUrl: './salesinfo.component.html',
  styleUrls: ['./salesinfo.component.css'],
})
export class SalesinfoComponent implements OnInit {
  user = { username: '' };
  salesCount;
  sum = 0;

  salesCart = [];

  constructor(private ds: DataService) {}

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
      },
      (err) => {}
    );
  }
}
