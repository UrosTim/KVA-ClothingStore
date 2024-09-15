import {Component, inject, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {Product} from "../../types/product";
import {MatButtonModule} from "@angular/material/button";
import {NgOptimizedImage, SlicePipe} from "@angular/common";
import {ProductCardComponent} from "../product-card/product-card.component";
import {CarouselModule, OwlOptions} from "ngx-owl-carousel-o";
import {WishlistService} from "../../services/wishlist.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    SlicePipe,
    ProductCardComponent,
    NgOptimizedImage,
    CarouselModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  customerService = inject(CustomerService);
  // wishlistService = inject(WishlistService);
  newProducts: Product[] = [];
  featuredProducts: Product[] = [];
  bannerImages: string[] = [
    "https://cdn.shopify.com/s/files/1/0896/8970/files/Casuals_Category_Banner-01.jpg?v=1698922847",
    "https://cdn.shopify.com/s/files/1/0896/8970/files/Formal_Shirt_Category_Banner-03_1.jpg?v=1698468597",
    "https://cdn.shopify.com/s/files/1/0896/8970/files/NEW_ARRIVALS_BANNER.jpg?v=1658734830",
    "https://cdn.shopify.com/s/files/1/0896/8970/files/view_all_BANNER.jpg?v=1658734830",
  ];

  ngOnInit() {
    this.customerService.getFeaturedProducts().subscribe((result) => {
      this.featuredProducts = result;
    });
    this.customerService.getNewProducts().subscribe((result) => {
      this.newProducts = result;
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    nav: true
  }
}
