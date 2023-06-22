import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '@bluebit/orders';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product!: Product;
  endSubs$ = new Subject();
  quantity = 1;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['productid']) {
        this._getProduct(params['productid']);
      }
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  addProductToCart() {
    const cartItem = {
      productId: this.product.id,
      quantity: this.quantity,
    };
    this.cartService.setCartItem(cartItem);
  }

  private _getProduct(id: string) {
    this.productsService
      .getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((product) => {
        this.product = product;
      });
  }
}
