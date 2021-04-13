import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productid;
  prodobj = { id: Number };
  product;
  constructor(private ar: ActivatedRoute, private ds: DataService) {}

  ngOnInit(): void {
    this.ar.paramMap.subscribe((data) => {
      this.productid = data['params'].id;

      console.log('clicked productid', this.productid);
    });
    this.prodobj.id = this.productid;

    this.ds.getProductwithid(this.prodobj).subscribe(
      (res) => {
        this.product = res['message'];
        console.log(this.product);
      },
      (err) => {}
    );
  }
}
