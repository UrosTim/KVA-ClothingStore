import {inject, Injectable} from '@angular/core';
import {Product} from "../types/product";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  http = inject(HttpClient)

  constructor() { }

  // wishlists: Product[] = [];
  //
  // init() {
  //   this.getWishlists().subscribe(result => {
  //     this.wishlists = result;
  //   })
  // }
  //
  // getWishlists() {
  //   return this.http.get<Product[]>(environment.apiUrl + '/customer/wishlists');
  // }
  //
  // addToWishlist(productId: string) {
  //   return this.http.post(environment.apiUrl + '/customer/wishlists/' + productId, {});
  // }
  //
  // removeFromWishlist(productId: string) {
  //   return this.http.delete(environment.apiUrl + '/customer/wishlists/' + productId);
  // }
}
