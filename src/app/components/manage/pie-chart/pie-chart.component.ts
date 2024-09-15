import {Component, OnInit} from '@angular/core';
import {CanvasJS} from "@canvasjs/angular-charts";
import {SalesService} from "../../../services/sales.service";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit{

  chartData: any[] = [];

  // Manually map category IDs to category names
  private categoryMapping: { [key: string]: string } = {
    '66d592e804f0fb9a6e5ce5cb': 'Casual',
    '66d592f604f0fb9a6e5ce5cd': 'Formal',
    '66d5930204f0fb9a6e5ce5cf': 'Kids',
    '66d59602818882a61f529b34': 'Accessories',
    '66d5923604f0fb9a6e5ce5c9': 'Sports',
    '66d5998f696651a2fef28e21': 'Underwear',
  };

  constructor(private dataService: SalesService) {}

  ngOnInit(): void {
    this.getTotalSales();
  }

  getTotalSales(): void {
    this.dataService.getTotalSalesPerCategory().subscribe(data => {
      // Map dynamic data to predefined category names
      this.chartData = data.map(item => ({
        label: this.categoryMapping[item._id] || 'Unknown Category',
        y: item.totalSales
      }));
      this.renderChart();
    });
  }

  renderChart(): void {
    const chart = new CanvasJS.Chart("pieChartContainer", {
      theme: "light2",
      title: {
        text: "Total Sales by Category"
      },
      data: [{
        type: "doughnut",
        dataPoints: this.chartData
      }]
    });
    chart.render();
  }
}
