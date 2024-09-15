import {Component, inject, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {Product} from "../../types/product";
import {ProductCardComponent} from "../product-card/product-card.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatSelectModule} from '@angular/material/select';
import {Category} from "../../types/category";
import {Brand} from "../../types/brand";
import {FormsModule} from "@angular/forms";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {ProductService} from "../../services/product.service";
import {SlicePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductCardComponent,
    MatSelectModule,
    FormsModule,
    MatPaginatorModule,
    SlicePipe,
    MatButton,
    RouterLink,
    FaIconComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{
  constructor(private productService: ProductService) { }
  customerService = inject(CustomerService);

  searchTerm: string = '';
  categoryId: string = '';
  brandId: string = '';
  sortBy: string = 'price';
  sortOrder: number = -1;
  pageSize: number = 4;
  pageNumber: number = 1;

  products:Product[] = [];
  route = inject(ActivatedRoute);

  categories:Category[] = [];
  brands:Brand[] = []

  ngOnInit() {
    this.customerService.getCategories().subscribe(result => {
      this.categories = result;
    });
    this.customerService.getBrands().subscribe(result => {
      this.brands = result;
    });

    this.route.queryParams.subscribe((x:any) => {
      this.searchTerm = x.search || '';
      this.categoryId = x.categoryId || '';

      this.getProducts();
    });
  }

  getProducts() {
    setTimeout(() => {
      this.customerService.getProducts(this.searchTerm, this.categoryId, this.brandId, this.pageNumber, this.pageSize, this.sortOrder, this.sortBy).subscribe(result => {
        this.products = result;
        console.log(result)
      });
    }, 100);
  }

  onOrderChange(event:any) {
    this.sortBy = 'price';
    this.sortOrder = event;
    this.getProducts();
  }

  pageChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getProducts();
  }

  protected readonly faShoppingCart = faShoppingCart;
}
