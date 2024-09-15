import {Component, inject, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Product} from "../../types/product";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {OrderService} from "../../services/order.service";
import {Order} from "../../types/order";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInputModule,
    MatLabel,
    ReactiveFormsModule,
    MatRadioModule,
    FormsModule,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit{

  cartService = inject(CartService);

  ngOnInit() {
    this.cartService.init();
  }

  get cartItems() {
    return this.cartService.items;
  }

  sellingPrice(product: Product) {
    return product.price - (product.price * product.discount) / 100
  }

  addToCart(productId: string, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe(result => {
      this.cartService.init();
    });
  }

  get totalAmount() {
    let amount = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      const element = this.cartItems[i];
      amount += this.sellingPrice(element.product) * element.quantity;
    }
    return amount;
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId).subscribe(result => {
      this.cartService.init();
    })
  }

  orderStep: number = 0;

  formBuilder = inject(FormBuilder);

  addressForm = this.formBuilder.group({
    address: [''],
    city: [''],
    zipCode: [''],
  })

  paymentType = 'cash';

  checkout() {
    this.orderStep = 1;
  }

  goBack() {
    this.orderStep = this.orderStep-1;
  }

  addAddress() {
    this.orderStep = 2;
  }

  orderService = inject(OrderService);
  router = inject(Router);

  submitOrder() {
    let order: Order = {
      items: this.cartItems,
      address: this.addressForm.value,
      payment: this.paymentType,
      date: new Date(),
    };
    this.orderService.addOrder(order).subscribe((result) => {
      alert('Order submitted.');
      this.cartService.init();
      this.orderStep = 0;
      this.router.navigateByUrl('/orders');
    });
  }
}
