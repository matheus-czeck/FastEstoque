import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductCardComponent } from "../../components/product-card/product-card.component";

@Component({
  selector: 'app-show-case',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TagModule,
    ButtonModule,
    RouterModule,
    NavbarComponent,
    ProductCardComponent
],
  templateUrl: './show-case.component.html',
  styleUrl: './show-case.component.css',
})
export class ShowCaseComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.listProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: () => {
        console.log('Erro ao carregar produtos');
      },
    });
  }
}
