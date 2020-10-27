import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.productService.getProducts();
  }

  delete(productId) {
    const ans = confirm('Do you want to delete product with id: ' + productId);
    if (ans) {
      this.productService.deleteProduct(productId).subscribe((data) => {
        this.loadProducts();
      });
    }
  }
}
