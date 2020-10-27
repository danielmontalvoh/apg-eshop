import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Products/';
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(this.myAppUrl + this.myApiUrl + productId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveProduct(product): Observable<Product> {
    return this.http.post<Product>(this.myAppUrl + this.myApiUrl, JSON.stringify(product), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateProduct(productId: number, product): Observable<Product> {
    return this.http.put<Product>(this.myAppUrl + this.myApiUrl + productId, JSON.stringify(product), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.http.delete<Product>(this.myAppUrl + this.myApiUrl + productId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
