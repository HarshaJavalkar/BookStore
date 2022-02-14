import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productid;
  prodobj = { id: Number };
  product;
  constructor(private ar: ActivatedRoute, private ds: DataService,private router:Router, private spinner: SpinnerService) {}
  
  clickedExplore(cardClicked) {
    this.router.navigateByUrl(`/store/${cardClicked}`);
  }

  ngOnInit(): void {
    this.ar.paramMap.subscribe((data) => {
      this.productid = data['params'].id;

      // console.log('clicked productid', this.productid);
    });
    this.prodobj.id = this.productid;
    // this.spinner.displayLoad(true);
    this.ds.getProductwithid(this.prodobj).subscribe(
      (res) => {
        this.product = res['message'];
      },
      (err) => {
        this.spinner.displayLoad(true);
      }
    );
  }
}
