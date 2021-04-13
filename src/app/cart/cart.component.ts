import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  user = { username: '' };
  cart: any;
  sum: number = 0;
  totalPrice: number;

  deliveryCharge: number;
  constructor(private ds: DataService, private router: Router) {}

  ngOnInit(): void {
    this.user.username = localStorage.getItem('username');

    this.ds.getCart(this.user).subscribe(
      (res) => {
        this.cart = res['message'];

        for (let i = 0; i < this.cart.length; i++)
          this.sum = this.sum + this.cart[i].prod_price;

        this.deliveryCharge = this.cart.length < 10 ? 50 : 100;

        this.totalPrice = this.deliveryCharge + this.sum;
      },
      (err) => {}
    );
  }
}
