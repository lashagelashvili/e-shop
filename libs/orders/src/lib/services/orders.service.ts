import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  apiURLOrders = environment.apiURL + 'orders';
  apiURLProducts = environment.apiURL + 'products';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiURLOrders);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiURLOrders, order);
  }

  updateOrder(
    orderStatus: { status: string },
    orderId: string
  ): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStatus);
  }

  deleteOrder(orderId: string): Observable<object> {
    return this.http.delete<object>(`${this.apiURLOrders}/${orderId}`);
  }

  getOrderCount(): Observable<object> {
    return this.http
      .get<object>(this.apiURLOrders + '/get/count')
      .pipe(map((res: any) => res.orderCount));
  }

  getTotalSales(): Observable<object> {
    return this.http
      .get<object>(this.apiURLOrders + '/get/totalsales')
      .pipe(map((res: any) => res.totalsales));
  }

  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURLProducts}/${productId}`);
  }
}
