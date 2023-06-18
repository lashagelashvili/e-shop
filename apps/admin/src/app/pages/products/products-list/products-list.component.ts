import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@bluebit/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products = [];
  endsubs$: Subject<void> = new Subject();

  constructor(
    private productsService: ProductsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(
          () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is deleted!',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted!',
            });
          }
        );
      },
    });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  private _getProducts() {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((products) => {
        this.products = products;
      });
  }
}
