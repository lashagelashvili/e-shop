import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@bluebit/orders';
import { ProductsService } from '@bluebit/products';
import { UsersService } from '@bluebit/users';
import { Subject, combineLatest, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  statistics = [];
  endsubs$: Subject<void> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private productService: ProductsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrderCount(),
      this.productService.getProductCount(),
      this.usersService.getUserCount(),
      this.ordersService.getTotalSales(),
    ])
      .pipe(takeUntil(this.endsubs$))
      .subscribe((orders) => (this.statistics = orders));
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
}
