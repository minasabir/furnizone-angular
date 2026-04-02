import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlistProducts: Product[] = [];
  loading = true;

  constructor(
    private wishlistService: WishlistService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.loading = true;
    
    this.wishlistService.getWishlist().subscribe({
      next: (wishlistIds) => {
        if (wishlistIds.length === 0) {
          this.wishlistProducts = [];
          this.loading = false;
          return;
        }

        // Fetch products for each wishlist item
        this.productService.getProducts({ pageSize: 100 }).subscribe({
          next: (response) => {
            this.wishlistProducts = response.data.filter(p => wishlistIds.includes(p.id));
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          }
        });
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId).subscribe(() => {
      this.wishlistProducts = this.wishlistProducts.filter(p => p.id !== productId);
    });
  }

  clearWishlist(): void {
    this.wishlistService.clearWishlist().subscribe(() => {
      this.wishlistProducts = [];
    });
  }

  addToCart(product: Product): void {
    // Cart service implementation would go here
    alert(`${product.name} added to cart!`);
  }

  navigateToProduct(productId: string): void {
    this.router.navigate(['/products', productId]);
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }
}
