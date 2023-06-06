import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@bluebit/orders';
import { ProductsService } from '@bluebit/products';
import { UsersService } from '@bluebit/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  statistics = [];

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
    ]).subscribe((orders) => (this.statistics = orders));
  }
}
