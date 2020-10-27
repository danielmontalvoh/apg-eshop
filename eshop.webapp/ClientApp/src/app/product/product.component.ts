import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product$: Observable<Product>;
  productId: number;

  constructor(private productService: ProductService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.productId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    this.product$ = this.productService.getProduct(this.productId);
  }
}
