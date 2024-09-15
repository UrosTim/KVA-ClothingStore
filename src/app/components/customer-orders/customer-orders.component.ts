import {Component, inject, OnInit} from '@angular/core';
import {Order} from "../../types/order";
import {OrderService} from "../../services/order.service";
import {Product} from "../../types/product";
import {DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [
    DatePipe,
    NgIf
  ],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.scss'
})
export class CustomerOrdersComponent implements OnInit{
  orders:Order[] = [];
  orderService = inject(OrderService);

  ngOnInit() {
    this.orderService.getCustomerOrders().subscribe(result => {
      this.orders = result;
      console.log(this.orders);
    })
  }

  sellingPrice(product: Product) {
    return product.price - (product.price * product.discount) / 100
  }

}
