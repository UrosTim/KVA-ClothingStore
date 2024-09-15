import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Order} from "../../../types/order";
import {OrderService} from "../../../services/order.service";
import {CanvasJS} from "@canvasjs/angular-charts";
import {Product} from "../../../types/product";

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit{
  orders: Order[] = [];
  chartOptions:any;

  constructor(private orderService: OrderService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.chartOptions = {
      title: {
        text: 'Total Sales per Quarter',
      },
      data: [
        {
          type: 'column',
          dataPoints: [
            { label: 'Q1', y: 0 },
            { label: 'Q2', y: 0 },
            { label: 'Q3', y: 0 },
            { label: 'Q4', y: 0 },
          ],
        },
      ],
    };

    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe((result) => {
      this.orders = result;
      this.updateChartData();
    });
  }

  updateChartData() {
    const salesByQuarter = this.totalSalesByQ(this.orders);
    this.chartOptions.data[0].dataPoints[0].y = salesByQuarter[0];
    this.chartOptions.data[0].dataPoints[1].y = salesByQuarter[1];
    this.chartOptions.data[0].dataPoints[2].y = salesByQuarter[2];
    this.chartOptions.data[0].dataPoints[3].y = salesByQuarter[3];

    const chart = new CanvasJS.Chart('chartContainer', this.chartOptions);
    chart.render();
  }

  sellingPrice(product: Product) {
    return product.price - (product.price * product.discount) / 100
  }

  totalPrice(order: Order) {
    let priceTotal = 0;
    order.items.map((x) => {
      priceTotal += this.sellingPrice(x.product) * x.quantity;
    })
    return +priceTotal.toFixed(2);
  }

  totalSalesByQ(orders: Order[]) {
    let startDate = new Date('2024-01-01').toISOString();
    let Q1finalDate = new Date('2024-03-31').toISOString();
    let Q2finalDate = new Date('2024-06-30').toISOString();
    let Q3finalDate = new Date('2024-09-30').toISOString();
    let Q4finalDate = new Date('2024-12-31').toISOString();

    let salesQ1 = 0;
    let salesQ2 = 0;
    let salesQ3 = 0;
    let salesQ4 = 0;
    for (let i = 0; i < orders.length; i++) {
      let orderDate = new Date(orders[i].date);
      let orderDateString = orderDate.toISOString();
      if (orderDateString <= Q1finalDate && orderDateString > startDate ) {
        salesQ1 += this.totalPrice(orders[i]);
      } else if (orderDateString <= Q2finalDate && orderDateString > Q1finalDate) {
        salesQ2 += this.totalPrice(orders[i]);
      } else if (orderDateString <= Q3finalDate && orderDateString > Q2finalDate) {
        salesQ3 += this.totalPrice(orders[i]);
      } else if (orderDateString <= Q4finalDate && orderDateString > Q3finalDate) {
        salesQ4 += this.totalPrice(orders[i]);
      }
    }
    console.log([salesQ1, salesQ2, salesQ3, salesQ4])
    return [salesQ1, salesQ2, salesQ3, salesQ4];

  }
}
