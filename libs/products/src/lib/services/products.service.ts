import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiURLProducts = environment.apiURL + 'products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLProducts);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiURLProducts, productData);
  }

  updateProduct(productData: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiURLProducts}/${productId}`,
      productData
    );
  }

  deleteProduct(productId: string): Observable<object> {
    return this.http.delete<object>(`${this.apiURLProducts}/${productId}`);
  }

  getProductCount(): Observable<object> {
    return this.http
      .get<object>(this.apiURLProducts + '/get/count')
      .pipe(map((res: any) => res.productCount));
  }
}
