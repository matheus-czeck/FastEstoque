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
import { ToastService } from '../../services/toast.service';
import { PaginatorModule } from 'primeng/paginator';

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
    PaginatorModule,
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css',
})
export class PanelComponent implements OnInit {
  products: Product[] = [];
  newProduct: CreateProduct = { name: '', price: 0, quantity: 0 };
  editingProduct: Product | null = null;
  showProductToEdit = false;
  page: number = 1;
  total: number = 0;
  isAdmin = this.authService.getRole() === 'admin';
  showRegisterDialog = false;
  newEmployee = { email: '', password: '' };

  constructor(
    private authService: AuthService,
    private productsService: ProductsService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.productsService.listProducts(this.page).subscribe({
      next: (res) => {
        this.products = res.products;
        this.total = res.total;
      },
      error: () => {
        this.toastService.error('Ocorreu um erro Interno.');
      },
    });
  }

  createProduct({ name, price, quantity }: CreateProduct) {
    this.productsService.createProduct({ name, price, quantity }).subscribe({
      next: () => {
        this.listProducts();
        this.toastService.success('Produto criado com sucesso!');
      },
      error: () => {
        this.toastService.error('Ocorreu um erro ao criar o Produto.');
      },
    });
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id).subscribe({
      next: () => {
        this.listProducts();
        this.toastService.success('Produto deletado com sucesso!');
      },
      error: () => {
        this.toastService.error('Erro ao deletar produto.');
      },
    });
  }
  updateProduct(id: string, product: Product) {
    this.productsService.updateProduct(id, product).subscribe({
      next: () => {
        this.listProducts();
        this.toastService.success('Produto alterado com sucesso!');
      },
      error: () => {
        this.toastService.error('Erro ao alterar produto.');
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
  onPageChange(event: any) {
    this.page = event.page + 1;
    this.ngOnInit();
  }
  openRegisterDialog() {
    this.showRegisterDialog = true;
  }

  registerEmpoyee() {
    this.authService
      .registerEmployee(this.newEmployee.email, this.newEmployee.password)
      .subscribe({
        next: () => {
          this.toastService.success('Novo colaborador criado!');
          this.showRegisterDialog = false;
          this.newEmployee = { email: '', password: '' };
        },
        error: () => {
          this.toastService.error('Erro ao criar colaborador.');
        },
      });
  }
}
