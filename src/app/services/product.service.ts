import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductCreateVM, ProductUpdateVM, ProductFilterParams, PagedResult, Category, CategoryCreateVM, CategoryUpdateVM } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrlV1 + '/Products';
  private categoryUrl = environment.apiUrl + '/Categories';

  constructor(private http: HttpClient) { }

  getProducts(params?: ProductFilterParams): Observable<PagedResult<Product>> {
    let httpParams = new HttpParams();

    if (params) {
      if (params.search) httpParams = httpParams.set('Search', params.search);
      if (params.categoryId) httpParams = httpParams.set('CategoryId', params.categoryId);
      if (params.minPrice) httpParams = httpParams.set('MinPrice', params.minPrice.toString());
      if (params.maxPrice) httpParams = httpParams.set('MaxPrice', params.maxPrice.toString());
      if (params.material) httpParams = httpParams.set('Material', params.material);
      if (params.status) httpParams = httpParams.set('Status', params.status);
      if (params.startDate) httpParams = httpParams.set('StartDate', params.startDate);
      if (params.endDate) httpParams = httpParams.set('EndDate', params.endDate);
      if (params.sortBy) httpParams = httpParams.set('SortBy', params.sortBy);
      if (params.sortOrder) httpParams = httpParams.set('SortOrder', params.sortOrder);
      if (params.sortDescending !== undefined) httpParams = httpParams.set('SortDescending', params.sortDescending.toString());
      if (params.pageNumber) httpParams = httpParams.set('PageNumber', params.pageNumber.toString());
      if (params.page) httpParams = httpParams.set('Page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('PageSize', params.pageSize.toString());
    }

    return this.http.get<PagedResult<Product>>(this.apiUrl, { params: httpParams });
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  searchProducts(query: string, params?: ProductFilterParams): Observable<PagedResult<Product>> {
    let httpParams = new HttpParams().set('query', query);

    if (params) {
      if (params.categoryId) httpParams = httpParams.set('CategoryId', params.categoryId);
      if (params.minPrice) httpParams = httpParams.set('MinPrice', params.minPrice.toString());
      if (params.maxPrice) httpParams = httpParams.set('MaxPrice', params.maxPrice.toString());
      if (params.pageSize) httpParams = httpParams.set('PageSize', params.pageSize.toString());
    }

    return this.http.get<PagedResult<Product>>(`${this.apiUrl}/search`, { params: httpParams });
  }

  getTopRated(count: number = 10): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/top-rated`, {
      params: new HttpParams().set('count', count.toString())
    });
  }

  getBestSellers(count: number = 10): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/best-sellers`, {
      params: new HttpParams().set('count', count.toString())
    });
  }

  createProduct(product: ProductCreateVM): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: ProductUpdateVM): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  patchProduct(id: string, product: Partial<ProductUpdateVM>): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.categoryUrl}/${id}`);
  }

  createCategory(category: CategoryCreateVM): Observable<Category> {
    return this.http.post<Category>(this.categoryUrl, category);
  }

  updateCategory(id: string, category: CategoryUpdateVM): Observable<Category> {
    return this.http.put<Category>(`${this.categoryUrl}/${id}`, category);
  }

  patchCategory(id: string, category: Partial<CategoryUpdateVM>): Observable<Category> {
    return this.http.patch<Category>(`${this.categoryUrl}/${id}`, category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.categoryUrl}/${id}`);
  }
}
