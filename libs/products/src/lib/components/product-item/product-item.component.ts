import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CartItem, CartService } from '@bluebit/orders';

@Component({
  selector: 'bluebit-products-product-item',
  templateUrl: './product-item.component.html',
  styles: [],
})
export class ProductItemComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1,
    };
    this.cartService.setCartItem(cartItem);
  }
}
