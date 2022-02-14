import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersistenceService } from 'angular-persistence';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { errorHandler } from '../responseHandler/response';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  booksAvailable: any = null;
  searchText;
  toast = true;
  username;
  booksUpdatedList = [];
  paymentRequest!:google.payments.api.PaymentDataRequest;

  product: any;
  errors: any;

  clickedToast() {
    this.toast = !this.toast;
  }
  navigatePremium() {
    this.router.navigateByUrl('/premium');
  }
  onLoadPayment(event){

  }
  // initialize and show Bootstrap 4 toast

  constructor(
    private ds: DataService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: SpinnerService,
    private persistenceService: PersistenceService
  ) {
    this.paymentRequest = {
      apiVersion:2,
      apiVersionMinor:0 ,
      allowedPaymentMethods:[
        
        {
          type:'CARD',
          parameters: {
            allowedAuthMethods:['PAN_ONLY','CRYPTOGRAM_3DS'],
            allowedCardNetworks:['MASTERCARD','VISA']
          },
          tokenizationSpecification:{
            type:'PAYMENT_GATEWAY',
            parameters:{
              gateway:'example',
              gatewayMerchantId:'exampleGatewayMerchantId',

            },
          },
        }
      ],
      merchantInfo:{
        merchantId:'176',
        merchantName:'Demo only' 
      },
      transactionInfo:{
        totalPriceStatus:'FINAL',
        totalPriceLabel:'Total',
        totalPrice: '100',
        currencyCode:'IND',
        countryCode:'IND',
      }
    }
  }

  clickedProduct(id) {
    this.router.navigateByUrl(`productinfo/${id}`);
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    
    // this.spinner.displayLoad(true);
    this.ds.getAllProductstoUsers().subscribe(
      (res) => {
        // this.spinner.displayLoad(false);
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
        } else {
          this.booksAvailable = res['message'];
          for (let i = 0; i < this.booksAvailable.length; i++) {
            if (this.booksAvailable[i].active)
              this.booksUpdatedList.push(this.booksAvailable[i]);
          }
        }
      },
      (err) => {
        
        this.persistenceService.set('ERRORS',errorHandler(err));
        // this.spinner.displayLoad(false);
        // this.router.navigateByUrl(`error`);
      }
    );
  }
}
