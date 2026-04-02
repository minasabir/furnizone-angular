import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckoutVM, Payment } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = environment.apiUrl + '/Payments';

  constructor(private http: HttpClient) { }

  checkout(checkoutData: CheckoutVM): Observable<{ orderId: string; paymentUrl?: string }> {
    return this.http.post<{ orderId: string; paymentUrl?: string }>(`${this.apiUrl}/checkout`, checkoutData);
  }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  getPaymentById(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }
}
