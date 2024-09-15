import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../types/product";
import {environment} from "../../environments/environment";
import {Category} from "../types/category";
import {Brand} from "../types/brand";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);

  constructor() {
  }

  getNewProducts() {
    return this.http.get<Product[]>(environment.apiUrl + '/customer/new-products');
  }

  getFeaturedProducts() {
    return this.http.get<Product[]>(environment.apiUrl + '/customer/featured-products');
  }

  getCategories():Observable<any> {
    return this.http.get<Category[]>(environment.apiUrl + '/customer/categories');
  }

  getBrands() {
    return this.http.get<Brand[]>(environment.apiUrl + '/customer/brands');
  }

  getProducts(
    searchTerm: string,
    categoryId: string,
    brandId: string,
    pageNumber: number,
    pageSize: number,
    sortOrder: number,
    sortBy: string,
  ) {
    return this.http.get<Product[]>(environment.apiUrl + `/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&brandId=${brandId}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
  }

  getProductById(id: string) {
    return this.http.get<Product>(environment.apiUrl + '/customer/product/' + id);
  }

  getBrandById(id: string) {
    return this.http.get<Brand>(environment.apiUrl + '/customer/brand/' + id)
  }

  getCategoryById(id: string) {
    return this.http.get<Category>(environment.apiUrl + '/customer/category/' + id)
  }
}
