import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { CartItemDetailed } from '../../models/cart';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  endSubs$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderstService: OrdersService
  ) {}

  ngOnInit(): void {
    this._getCardDetails();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getCardDetails() {
    // this.cartService.cart$
    //   .pipe(
    //     switchMap((cart) => {
    //       cart.items.forEach((item) => {
    //         return this.orderstService.getProduct(item.productId);
    //       });
    //     })
    //   )
    //   .subscribe(console.log);

    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.cartItemsDetailed = [];
      this.cartCount = cart?.items.length ?? 0;
      cart.items.forEach((item) => {
        this.orderstService.getProduct(item.productId).subscribe((product) => {
          this.cartItemsDetailed.push({
            product,
            quantity: item.quantity,
          });
        });
      });
    });
  }

  backToShop() {
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
  }

  updateCartItemQuantity(event, cartItem: CartItemDetailed) {
    this.cartService.setCartItem(
      {
        productId: cartItem.product.id,
        quantity: event.value,
      },
      true
    );
  }
}
