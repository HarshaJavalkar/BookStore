import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  booksAvailable: any=null;
  searchText;
  toast = true;
  username;
  booksUpdatedList=[]

  product: any;

  clickedToast() {
    this.toast = !this.toast;
  }
  navigatePremium() {
    this.router.navigateByUrl('/premium');
  }

  // initialize and show Bootstrap 4 toast

  constructor(
    private ds: DataService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: SpinnerService
  ) {}

  clickedProduct(id) {
    this.router.navigateByUrl(`productinfo/${id}`);
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.spinner.displayLoad(true);
    this.ds.getAllProductstoUsers().subscribe(
      (res) => {
        if (
          res['message'] == 'Session is Expired.. Please relogin to continue'
        ) {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('Usertype');
          this.router.navigateByUrl('/login');
          alert('Session Expired Please relogin');
        }
        if (res['message'] == 'Unauthorized access') {
          alert(res['message']);
        }
         else 
         
         this.booksAvailable = res['message'];
         for (let i = 0; i < this.booksAvailable.length; i++) {
          if (this.booksAvailable[i].active)
            this.booksUpdatedList.push(this.booksAvailable[i]);
        }
      

         
      },
      (err) => {
        this.spinner.displayLoad(false);
      }
    );
  }
}
