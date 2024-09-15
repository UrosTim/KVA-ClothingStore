import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatCardModule} from '@angular/material/card';
import {AdminSidebarComponent} from "../admin-sidebar/admin-sidebar.component";
import {CanvasJS, CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
import {Order} from "../../../types/order";
import {Product} from "../../../types/product";
import {OrderService} from "../../../services/order.service";
import {BarChartComponent} from "../bar-chart/bar-chart.component";
import {PieChartComponent} from "../pie-chart/pie-chart.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    MatCardModule,
    AdminSidebarComponent,
    CanvasJSAngularChartsModule,
    BarChartComponent,
    PieChartComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent{
}
