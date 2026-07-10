import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, CreateProduct } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = 'https://fastestoque-production-2ada.up.railway.app';
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
  }

  listProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }
  createProduct(product: CreateProduct) {
    return this.http.post<Product>(`${this.apiUrl}/products`, product, {
      headers: this.getHeaders(),
    });
  }
  updateProduct(id: string, product: CreateProduct) {
    return this.http.patch<Product>(`${this.apiUrl}/products/${id}`, product, {
      headers: this.getHeaders(),
    });
  }

  deleteProduct(id: string) {
    return this.http.delete<Product>(`${this.apiUrl}/products/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
