import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {DatePipe, NgIf} from "@angular/common";
import {Order} from "../../../types/order";
import {Product} from "../../../types/product";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {CanvasJS, CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
import {AdminSidebarComponent} from "../admin-sidebar/admin-sidebar.component";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    MatButtonToggleGroup,
    MatButtonToggle,
    CanvasJSAngularChartsModule,
    AdminSidebarComponent,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{

  orders: Order[] = [];
  chartOptions:any;

  constructor(private orderService: OrderService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // this.chartOptions = {
    //   title: {
    //     text: 'Total Sales per Quarter',
    //   },
    //   data: [
    //     {
    //       type: 'column',
    //       dataPoints: [
    //         { label: 'Q1', y: 0 },
    //         { label: 'Q2', y: 0 },
    //         { label: 'Q3', y: 0 },
    //         { label: 'Q4', y: 0 },
    //       ],
    //     },
    //   ],
    // };

    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe((result) => {
      this.orders = result;
      // this.updateChartData();
    });
  }

  sellingPrice(product: Product) {
    return product.price - (product.price * product.discount) / 100
  }

  statusChanged(button: any, order: Order) {
    this.orderService.updateOrderStatus(order._id!, button.value).subscribe(result => {
      alert("Order status updated.");
    })
  }

  totalPrice(order: Order) {
    let priceTotal = 0;
    order.items.map((x) => {
      priceTotal += this.sellingPrice(x.product) * x.quantity;
    })
    return +priceTotal.toFixed(2);
  }

  totalSales(orders: Order[]) {
    let salesTotal = 0;
    for (let i = 0; i < orders.length; i++) {
      salesTotal += this.totalPrice(orders[i]);
    }
    return salesTotal;
  }
}
