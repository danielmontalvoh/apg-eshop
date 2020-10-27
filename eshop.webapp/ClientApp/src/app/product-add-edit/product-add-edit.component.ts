import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent implements OnInit {
  productForm: FormGroup;
  actionType: string;
  formDescription: string;
  formBrand: string;
  formModel: string;
  formUnitPrice: string;
  formDiscountPercentage: string;
  productId: number;
  errorMessage: any;
  existingProduct: Product;

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formDescription = 'description';
    this.formBrand = 'brand';
    this.formModel = 'model';
    this.formUnitPrice = 'unitPrice';
    this.formDiscountPercentage = 'discountPercentage';
    if (this.avRoute.snapshot.params[idParam]) {
      this.productId = this.avRoute.snapshot.params[idParam];
    }

    this.productForm = this.formBuilder.group(
      {
        productId: 0,
        description: ['', [Validators.required]],
        brand: ['', [Validators.required]],
        model: ['', [Validators.required]],
        unitPrice: [0, [Validators.required]],
        discountPercentage: [0, [Validators.required]]
      }
    )
  }

  ngOnInit() {

    if (this.productId > 0) {
      this.actionType = 'Edit';
      this.productService.getProduct(this.productId)
        .subscribe(data => (
          this.existingProduct = data,
          this.productForm.controls[this.formDescription].setValue(data.description),
          this.productForm.controls[this.formBrand].setValue(data.brand),
          this.productForm.controls[this.formModel].setValue(data.model),
          this.productForm.controls[this.formUnitPrice].setValue(data.unitPrice),
          this.productForm.controls[this.formDiscountPercentage].setValue(data.discountPercentage)
        ));
    }
  }

  save() {
    if (!this.productForm.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let product: Product = {
        description: this.productForm.get(this.formDescription).value,
        brand: this.productForm.get(this.formBrand).value,
        model: this.productForm.get(this.formModel).value,
        unitPrice: this.productForm.get(this.formUnitPrice).value,
        discountPercentage: this.productForm.get(this.formDiscountPercentage).value
      };

      this.productService.saveProduct(product)
        .subscribe((data) => {
          this.router.navigate(['/product', data.productId]);
        });
    }

    if (this.actionType === 'Edit') {
      let product: Product = {
        productId: this.existingProduct.productId,
        description: this.productForm.get(this.formDescription).value,
        brand: this.productForm.get(this.formBrand).value,
        model: this.productForm.get(this.formModel).value,
        unitPrice: this.productForm.get(this.formUnitPrice).value,
        discountPercentage: this.productForm.get(this.formDiscountPercentage).value
      };
      this.productService.updateProduct(product.productId, product)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get description() { return this.productForm.get(this.formDescription); }
  get brand() { return this.productForm.get(this.formBrand); }
  get model() { return this.productForm.get(this.formModel); }
  get unitPrice() { return this.productForm.get(this.formUnitPrice); }
  get discountPercentage() { return this.productForm.get(this.formDiscountPercentage); }
}
