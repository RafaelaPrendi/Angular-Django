import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://127.0.0.1:8000/products/';

  constructor(private httpclient: HttpClient,
              private messageService: MessageService) {
  }

  getProducts(): Observable<Product[]> {
    return this.httpclient.get<Product[]>(this.baseUrl);
  }

  create(product: Product): Observable<Product> {
    this.messageService.openSnackBar('Added new product', 'Close');
    return this.httpclient.post<Product>(this.baseUrl, product);
  }

  getSingleProduct(id: number): Observable<Product> {
    return this.httpclient.get<Product>(`${this.baseUrl}${id}`);
  }

  delete(id: number): Observable<any> {
    this.messageService.openSnackBar(`Deleted a product with the id: ${id}`, 'Close');
    return this.httpclient.delete(`${this.baseUrl}${id}`);
  }

  update(id: number, data: Product): Observable<any> {
    this.messageService.openSnackBar(`Updated a product with the id: ${id}`, 'Close');
    return this.httpclient.put(`${this.baseUrl}${id}`, data);
  }
}
