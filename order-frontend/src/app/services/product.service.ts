import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import { HttpClient} from "@angular/common/http";
import {Product} from "../interfaces/product";
import {PRODUCTS} from "../mock-data/mock-products";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://127.0.0.1:8000/products/';

  constructor(private httpclient: HttpClient,
              private messageService: MessageService) { }

    getProducts(): Observable<Product[]>{
    this.messageService.add('ProductService: fetched products');
    return this.httpclient.get<Product[]>(this.baseUrl);
              }
}
