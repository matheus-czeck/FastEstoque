import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { AuthService } from '../../services/auth.service';
import { Product, CreateProduct } from '../../models/product.model';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CurrencyPipe } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    TagModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CurrencyPipe,
    NavbarComponent,
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css',
})
export class PanelComponent implements OnInit {
  products: Product[] = [];
  newProduct: CreateProduct = { name: '', price: 0, quantity: 0 };
  editingProduct: Product | null = null;
  showProductToEdit = false;

  constructor(
    private authService: AuthService,
    private productsService: ProductsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.productsService.listProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: () => {
        console.error('Produtos nao encontrados!');
      },
    });
  }

  createProduct({ name, price, quantity }: CreateProduct) {
    this.productsService.createProduct({ name, price, quantity }).subscribe({
      next: () => {
        this.listProducts();
      },
      error: () => {
        console.error('Erro ao criar produto!');
      },
    });
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id).subscribe({
      next: () => {
        this.listProducts();
      },
      error: () => {
        console.error('Erro ao deletar produto.');
      },
    });
  }
  updateProduct(id: string, product: Product) {
    this.productsService.updateProduct(id, product).subscribe({
      next: () => {
        this.listProducts();
      },
      error: () => {
        console.error('Erro ao atualizar produto.');
      },
    });
  }

  selectProductToEdit(product: Product) {
    this.editingProduct = { ...product };
    this.showProductToEdit = true;
  }

  confirmUpdate() {
    if (!this.editingProduct) return;
    this.updateProduct(this.editingProduct.id, this.editingProduct);
    this.editingProduct = null;
    this.showProductToEdit = false;
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
