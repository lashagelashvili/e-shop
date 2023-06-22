import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Subject, empty, forkJoin, of } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-summary',
  templateUrl: './order-summary.component.html',
  styles: [],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  endSubs$: Subject<void> = new Subject();
  totalPrice = 0;
  isCheckout = false;
  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {
    this.router.url.includes('checkout')
      ? (this.isCheckout = true)
      : (this.isCheckout = false);
  }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  _getOrderSummary() {
    this.cartService.cart$
      .pipe(
        takeUntil(this.endSubs$),
        switchMap((cart) => {
          this.totalPrice = 0;

          if (cart) {
            const productObservables = cart.items.map((item) => {
              return this.ordersService
                .getProduct(item.productId)
                .pipe(take(1));
            });

            return forkJoin(productObservables).pipe(
              map((products) => {
                return { cart, products };
              })
            );
          }

          return EMPTY;
        })
      )
      .subscribe(({ cart, products }) => {
        this.totalPrice = products.reduce((total, product, index) => {
          const item = cart.items[index];
          return total + product.price * item.quantity;
        }, 0);
      });
  }

  navigateToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
