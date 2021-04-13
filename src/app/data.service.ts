import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  address: any;
  private subject = new Subject<any>();

  constructor(private hc: HttpClient) {}

  createUser(userObj): Observable<any> {
    return this.hc.post('/user/createuser', userObj);
  }

  createProduct(productObj): Observable<any> {
    return this.hc.post('/product/createproduct', productObj);
  }
  loginUser(loginObj): Observable<any> {
    return this.hc.post('/user/login', loginObj);
  }
  loginAdmin(loginObj): Observable<any> {
    return this.hc.post('/admin/login', loginObj);
  }

  sendloginState(loginState) {
    this.subject.next(loginState);
  }
  getProductsAdventure(): Observable<any> {
    return this.hc.get('/product/getproductsadventure');
  }
  createAdmin(adminObj): Observable<any> {
    return this.hc.post('/admin/createadmin', adminObj);
  }

  receiveloginState(): Observable<any> {
    return this.subject.asObservable();
  }

  updateAdminProducts(adminReqObj): Observable<any> {
    return this.hc.post('/product/updateadminproduct', adminReqObj);
  }

  deleteAdminProducts(prod_id): Observable<any> {
    return this.hc.post('/product/deleteproduct', prod_id);
  }

  getAllProductstoUsers(): Observable<any> {
    return this.hc.get('/product/getAllProductsToUsers');
  }

  // service to get books based on category

  getProducts(localUser): Observable<any> {
    console.log('service', localUser);

    return this.hc.post('/product/getproducts', localUser);
  }

  addtoCart(book): Observable<any> {
    return this.hc.post('/user/userCartAdd', book);
  }

  getCart(username): Observable<any> {
    return this.hc.post('/user/getCart', username);
  }

  removeFromCart(item): Observable<any> {
    return this.hc.post('/user/deletefromcart', item);
  }

  addAddress(addObj): Observable<any> {
    return this.hc.post('/user/addAddress', addObj);
  }

  getAddress(user): Observable<any> {
    return this.hc.post('/user/getAddress', user);
  }

  deleteAddress(user): Observable<any> {
    return this.hc.post('/user/deleteUserAddress', user);
  }

  selectedAddressSetup(orders): Observable<any> {
    return this.hc.post('/user/orders', orders);
  }

  cardSave(cardDetails): Observable<any> {
    return this.hc.post('/user/cardAdd', cardDetails);
  }

  getCards(cardObj): Observable<any> {
    return this.hc.post('/user/getUserCards', cardObj);
  }

  makePaymentFinal(user): Observable<any> {
    return this.hc.post('/user/makePayment', user);
  }

  makePaymentFinalStep(user): Observable<any> {
    console.log(user);
    return this.hc.post('/user/makePaymentNext', user);
  }

  sendDatatoAddress(receivedAddress) {
    this.address = receivedAddress;
  }

  receiveFinalAddress() {
    return this.address;
  }

  deleteCard(cardIndex): Observable<any> {
    return this.hc.post('/user/deletecard', cardIndex);
  }

  getOrders(username): Observable<any> {
    return this.hc.post('/user/getOrders', username);
  }

  checkDelete(cart): Observable<any> {
    return this.hc.post('/product/checkDeleted', cart);
  }

  getProductsById(id): Observable<any> {
    return this.hc.post('/product/getSingleProduct', id);
  }

  // wishlist

  moveToWishlistFromStore(book): Observable<any> {
    return this.hc.post('/user/userWishListAdd', book);
  }
  getproductsFromWishlist(userObj): Observable<any> {
    return this.hc.post('/user/getAllProductsToUsersFromWishlist', userObj);
  }
  deleteProductFromWishlist(wishprod): Observable<any> {
    return this.hc.post('/user/deleteproductfromwishlist', wishprod);
  }

  moveToCartFromWishlist(wishprod): Observable<any> {
    return this.hc.post('/user/movetocartfromwishlist', wishprod);
  }

  getProductwithid(prodobj): Observable<any> {
    return this.hc.post('/product/getproductwithid', prodobj);
  }

  getprofile(userObj): Observable<any> {
    return this.hc.post('/user/getuserprofile', userObj);
  }

  changepassword(userpass): Observable<any> {
    return this.hc.post('/user/changepassword', userpass);
  }
}
