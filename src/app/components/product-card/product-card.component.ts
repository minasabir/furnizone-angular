import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<string>();
  @Output() toggleWishlist = new EventEmitter<string>();

  isInWishlist = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) { }

  ngOnInit(): void {
    this.isInWishlist = this.wishlistService.isInWishlist(this.product.id);
  }

  onAddToCart(event: Event): void {
    event.stopPropagation();
    this.cartService.addToCart(this.product.id, 1).subscribe(() => {
      this.addToCart.emit(this.product.id);
    });
  }

  onToggleWishlist(event: Event): void {
    event.stopPropagation();
    if (this.isInWishlist) {
      this.wishlistService.removeFromWishlist(this.product.id).subscribe(() => {
        this.isInWishlist = false;
        this.toggleWishlist.emit(this.product.id);
      });
    } else {
      this.wishlistService.addToWishlist(this.product.id).subscribe(() => {
        this.isInWishlist = true;
        this.toggleWishlist.emit(this.product.id);
      });
    }
  }

  navigateToProduct(): void {
    this.router.navigate(['/products', this.product.id]);
  }
}
