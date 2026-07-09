import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/produto.model';

@Component({
  selector: 'app-show-case',
  standalone: true,
  imports: [CommonModule],
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
      error: ()=>{
        console.log("Erro ao carregar produtos")
      }
    });
  }
}
