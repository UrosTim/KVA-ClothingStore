import {Component, inject, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../types/product";
import {Brand} from "../../types/brand";
import {Category} from "../../types/category";
import {SlicePipe} from "@angular/common";
import {ProductCardComponent} from "../product-card/product-card.component";
import {CartService} from "../../services/cart.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    SlicePipe,
    ProductCardComponent,
    MatIcon,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  customerService = inject(CustomerService);
  cartService = inject(CartService);
  route = inject(ActivatedRoute);

  product!: Product;
  brand!: Brand;
  category!: Category;

  // similarProducts: Product[] = [];

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.getProductDetails(params.id)
    })

    this.cartService.init();
  }

  getProductDetails(id: string) {
    this.customerService.getProductById(id).subscribe(result => {
      this.product = result;
    });
    setTimeout(() => {
      this.customerService.getBrandById(this.product.brandId).subscribe(result => {
        this.brand = result;
      });
    }, 100);

    setTimeout(() => {
      this.customerService.getCategoryById(this.product.categoryId).subscribe(result => {
        this.category = result;
      });
    }, 100);
  }

  get sellingPrice() {
    return this.product.price - (this.product.price * this.product.discount) / 100
  }

  addToCart(product: Product) {
    console.log(product)
    if (!this.isInCart(product._id!)) {
      this.cartService.addToCart(product._id!, 1).subscribe(() => {
        this.cartService.init();
      });
    } else {
      this.cartService.removeFromCart(product._id!).subscribe(() => {
        this.cartService.init();
      });
    }
  }

  isInCart(productId: string) {
    if (this.cartService.items.find(x => x.product._id == productId)) {
      return true;
    } else {
      return false;
    }
  }
}
