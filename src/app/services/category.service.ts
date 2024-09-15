import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../types/category";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  http = inject(HttpClient);

  constructor() {
  }

  getCategories() {
    return this.http.get<Category[]>(environment.apiUrl + '/category');
  }

  getCategoryById(id: string) {
    return this.http.get<Category>(environment.apiUrl + '/category/' + id);
  }

  addCategory(name: string) {
    return this.http.post(environment.apiUrl + '/category', {
      name: name,
    });
  }

  updateCategory(id: string, name: string) {
    return this.http.put(environment.apiUrl + '/category/' + id, {
      name: name,
    });
  }
  deleteCategory(id: string) {
    return this.http.delete(environment.apiUrl + '/category/' + id);
  }
}
