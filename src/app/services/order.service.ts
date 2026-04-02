import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderCreateVM, OrderStatusUpdateVM } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl + '/Orders';

  constructor(private http: HttpClient) { }

  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/my-orders`);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(orderData: OrderCreateVM): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/create`, orderData);
  }

  updateOrderStatus(id: string, status: string): Observable<Order> {
    const updateData: OrderStatusUpdateVM = { status };
    return this.http.put<Order>(`${this.apiUrl}/${id}/status`, updateData);
  }

  patchOrderStatus(id: string, status: string): Observable<Order> {
    const updateData: OrderStatusUpdateVM = { status };
    return this.http.patch<Order>(`${this.apiUrl}/${id}/status`, updateData);
  }

  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
