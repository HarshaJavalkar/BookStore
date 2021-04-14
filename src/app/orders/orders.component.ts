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
  arr: any
  productsList = [];
  sum: number = 0;
  pre: boolean =false
  nex: boolean = true 
  status: string;

// start = 0
// end = 10
//   next(){


//     if(!(this.end>this.productsList.length-1)){
    
//     this.start =this.start+10
//     this.end=this.end+10
    
//     this.nex=true
    
//     this.arr=this.productsList.slice(this.start,this.end)
//     console.log(this.arr)
//   }
//   else{
 
//     this.nex=true



//   }




//   }


//   prev(){
 


//     if((this.start<10)){
//     this.start =this.start-10
//     this.end=this.end-10
//     this.pre=true
//     this.arr=this.productsList.slice(this.start,this.end)
//     console.log("3",this.arr)
//     }
//     else{
//       this.pre=false

//     }





//   }

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


       for(let i=0;i<this.productsList.length;i++ ){

        this.sum=Math.round(this.sum+this.productsList[i].prod_price)
       }


        // console.log("god must be krazy",this.productsList)
      },
      (err) => {}
    );
  }
}
