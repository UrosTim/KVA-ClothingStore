import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../types/order";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  http = inject(HttpClient);

  constructor() { }

  addOrder(order: Order) {
    return this.http.post(environment.apiUrl + '/customer/order', order);
  }

  getCustomerOrders():Observable<any> {
    return this.http.get<Order[]>(environment.apiUrl + '/customer/orders');
  }

  getOrders() {
    return this.http.get<Order[]>(environment.apiUrl + '/orders');
  }

  updateOrderStatus(id:string, status:string) {
    return this.http.post(environment.apiUrl + '/orders/' + id, {
      status:status,
    });
  }


}
