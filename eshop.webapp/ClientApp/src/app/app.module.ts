
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { ProductService } from './services/product.service'

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ProductsComponent,
    ProductComponent,
    ProductAddEditComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent, pathMatch: 'full' },
      { path: 'product/:id', component: ProductComponent },
      { path: 'add', component: ProductAddEditComponent },
      { path: 'product/edit/:id', component: ProductAddEditComponent },
      { path: '**', redirectTo: '/' }
    ])
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
