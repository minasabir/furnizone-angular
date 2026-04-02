import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginRequestVM, LoginResponse, User, UserCreateVM } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('furnizone_user');
    const token = localStorage.getItem('furnizone_token');
    if (storedUser && token) {
      const user: User = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const credentials: LoginRequestVM = { email, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/Auth/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('furnizone_token', response.token);
          localStorage.setItem('furnizone_user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true);
        }),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Login failed'));
        })
      );
  }

  register(fullName: string, email: string, password: string): Observable<LoginResponse> {
    const userData: UserCreateVM = { fullName, email, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/Auth/register`, userData)
      .pipe(
        tap(response => {
          localStorage.setItem('furnizone_token', response.token);
          localStorage.setItem('furnizone_user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true);
        }),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Registration failed'));
        })
      );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/Auth/logout`, {})
      .pipe(
        tap(() => {
          localStorage.removeItem('furnizone_token');
          localStorage.removeItem('furnizone_user');
          this.currentUserSubject.next(null);
          this.isAuthenticatedSubject.next(false);
        }),
        catchError(() => {
          localStorage.removeItem('furnizone_token');
          localStorage.removeItem('furnizone_user');
          this.currentUserSubject.next(null);
          this.isAuthenticatedSubject.next(false);
          return of(undefined);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('furnizone_token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/Users/profile`, userData)
      .pipe(
        tap(user => {
          localStorage.setItem('furnizone_user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/Users/profile`);
  }
}
