import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Category, Product } from '../../models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  categoryProducts: { [key: string]: Product[] } = {};
  loading = true;

  categoryIcons: { [key: string]: string } = {
    'Living Room': 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4',
    'Bedroom': 'M5 15l7-7 7 7M5 15v4a2 2 0 002 2h10a2 2 0 002-2v-4',
    'Dining Room': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    'Office': 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    'Outdoor': 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
  };

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loadCategoryProducts(categories);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadCategoryProducts(categories: Category[]): void {
    categories.forEach(category => {
      this.productService.getProducts({ categoryId: category.id, pageSize: 4 }).subscribe({
        next: (response) => {
          this.categoryProducts[category.id] = response.data;
        }
      });
    });
  }

  getCategoryIconPath(name: string): string {
    return this.categoryIcons[name] || this.categoryIcons['Living Room'];
  }
}
