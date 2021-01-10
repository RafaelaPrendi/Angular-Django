import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import { HttpClient} from "@angular/common/http";
import {Order} from "../interfaces/order";
import {ORDERS} from "../mock-data/mock-orders";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://127.0.0.1:8000/orders/';
  constructor(private httpclient: HttpClient,
              private messageService: MessageService) { }
              getOrders(): Observable<Order[]>{
    this.messageService.add('OrderService: fetched orders');
    return this.httpclient.get<Order[]>(this.baseUrl);
              }
}
