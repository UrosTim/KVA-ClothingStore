import {Component, inject, Input} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {Product} from "../../types/product";
import {RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MatIconModule} from "@angular/material/icon";
import {WishlistService} from "../../services/wishlist.service";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    FaIconComponent,
    MatIconModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;

  // wishlistService = inject(WishlistService);
  //
  // addToWishList(product: Product) {
  //   if (this.isInWishlist(product)) {
  //     this.wishlistService.removeFromWishlist(product._id!).subscribe((result) => {
  //       this.wishlistService.init();
  //     });
  //   } else {
  //     this.wishlistService.addToWishlist(product._id!).subscribe((result) => {
  //       this.wishlistService.init();
  //     });
  //   }
  // }
  //
  // isInWishlist(product:Product) {
  //   let productExists = this.wishlistService.wishlists.find(x => x._id == product._id);
  //   if (productExists) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
