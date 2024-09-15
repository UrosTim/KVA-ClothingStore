import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private apiUrl = 'http://localhost:3000/orders/total-sales-per-category'; // Adjust the URL if needed

  constructor(private http: HttpClient) { }

  getTotalSalesPerCategory(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + '/orders/total-sales-per-category').pipe(
      tap(data => console.log('Fetched data:', data))  // Log data for debugging
    );
  }
}
