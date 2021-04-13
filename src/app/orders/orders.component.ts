import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  username = { username: '' };
  myOrders: any;
  productsReceived;

  productsList = [];

  status: string;

  constructor(private ds: DataService, private router: Router) {}

  ngOnInit(): void {
    this.username.username = localStorage.getItem('username');

    this.ds.getOrders(this.username).subscribe(
      (res) => {
        this.myOrders = res['message'];

        // // console.log(this.myOrders[0].products)

        for (let i = 0; i < this.myOrders.length; i++) {
          // this.productsReceived.append(this.myOrders[i].products)
          // console.log("i",this.myOrders[i].products)

          for (let j = 0; j < this.myOrders[i].products.length; j++) {
            this.productsList.push(this.myOrders[i].products[j]);
          }
        }

        // console.log("god must be krazy",this.productsList)
      },
      (err) => {}
    );
  }
}
