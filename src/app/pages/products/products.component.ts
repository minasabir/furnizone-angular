import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, Category, ProductFilterParams } from '../../models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  loading = true;
  totalCount = 0;
  currentPage = 1;
  pageSize = 12;
  
  // Filters
  selectedCategory = '';
  searchQuery = '';
  minPrice?: number;
  maxPrice?: number;
  selectedMaterial = '';
  sortBy = 'createdAt';
  sortOrder = 'desc';

  materials = ['Wood', 'Metal', 'Fabric', 'Leather', 'Velvet', 'Glass', 'Plastic', 'Rattan'];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['categoryId'] || '';
      this.searchQuery = params['search'] || '';
      this.currentPage = parseInt(params['page']) || 1;
      this.loadProducts();
    });

    this.loadCategories();
  }

  loadProducts(): void {
    this.loading = true;
    
    const params: ProductFilterParams = {
      page: this.currentPage,
      pageSize: this.pageSize,
      search: this.searchQuery || undefined,
      categoryId: this.selectedCategory || undefined,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      material: this.selectedMaterial || undefined,
      sortBy: this.sortBy,
      sortDescending: this.sortOrder === 'desc'
    };

    this.productService.getProducts(params).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalCount = response.totalCount;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.products = [];
      }
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.updateQueryParams();
  }

  onCategoryChange(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.currentPage = 1;
    this.updateQueryParams();
  }

  onPriceChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onMaterialChange(material: string): void {
    this.selectedMaterial = this.selectedMaterial === material ? '' : material;
    this.currentPage = 1;
    this.loadProducts();
  }

  onSortChange(sortBy: string): void {
    if (this.sortBy === sortBy) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = sortBy;
      this.sortOrder = 'asc';
    }
    this.loadProducts();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateQueryParams();
  }

  updateQueryParams(): void {
    const queryParams: any = {};
    if (this.selectedCategory) queryParams.categoryId = this.selectedCategory;
    if (this.searchQuery) queryParams.search = this.searchQuery;
    if (this.currentPage > 1) queryParams.page = this.currentPage;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });

    this.loadProducts();
  }

  clearFilters(): void {
    this.selectedCategory = '';
    this.searchQuery = '';
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.selectedMaterial = '';
    this.currentPage = 1;
    this.router.navigate(['/products']);
    this.loadProducts();
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  get pages(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
