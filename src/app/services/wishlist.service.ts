import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WishlistItem, Product } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = environment.apiUrl + '/Wishlist';
  private wishlistSubject = new BehaviorSubject<string[]>([]);
  public wishlist$ = this.wishlistSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadWishlist();
  }

  private loadWishlist(): void {
    this.getWishlist().subscribe({
      next: (items) => this.wishlistSubject.next(items),
      error: () => this.wishlistSubject.next([])
    });
  }

  getWishlist(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }

  addToWishlist(productId: string): Observable<string[]> {
    return this.http.post<string[]>(`${this.apiUrl}/${productId}`, {})
      .pipe(
        tap(items => this.wishlistSubject.next(items))
      );
  }

  removeFromWishlist(productId: string): Observable<string[]> {
    return this.http.delete<string[]>(`${this.apiUrl}/${productId}`)
      .pipe(
        tap(items => this.wishlistSubject.next(items))
      );
  }

  clearWishlist(): Observable<void> {
    return this.http.delete<void>(this.apiUrl)
      .pipe(
        tap(() => this.wishlistSubject.next([]))
      );
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistSubject.value.includes(productId);
  }

  getWishlistCount(): number {
    return this.wishlistSubject.value.length;
  }
}
