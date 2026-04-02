import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Cart, CartItem, AddToCartVM, UpdateCartItemVM } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = environment.apiUrl + '/Cart';
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  private loadCart(): void {
    this.getCart().subscribe({
      next: (cart) => this.cartSubject.next(cart),
      error: () => this.cartSubject.next(null)
    });
  }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl);
  }

  addToCart(productId: string, quantity: number = 1): Observable<Cart> {
    const addData: AddToCartVM = { quantity };
    return this.http.post<Cart>(`${this.apiUrl}/add/${productId}`, addData)
      .pipe(
        tap(cart => this.cartSubject.next(cart))
      );
  }

  updateCartItem(productId: string, quantity: number): Observable<Cart> {
    const updateData: UpdateCartItemVM = { quantity };
    return this.http.put<Cart>(`${this.apiUrl}/update/${productId}`, updateData)
      .pipe(
        tap(cart => this.cartSubject.next(cart))
      );
  }

  removeFromCart(productId: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/remove/${productId}`)
      .pipe(
        tap(cart => this.cartSubject.next(cart))
      );
  }

  clearCart(): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/clear`)
      .pipe(
        tap(cart => this.cartSubject.next(cart))
      );
  }

  getCurrentCart(): Cart | null {
    return this.cartSubject.value;
  }

  getCartItemCount(): number {
    const cart = this.cartSubject.value;
    return cart?.totalItems || 0;
  }
}
