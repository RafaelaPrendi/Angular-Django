import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient} from "@angular/common/http";
import {Order} from "../models/order";


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://127.0.0.1:8000/orders/';

  constructor(private httpclient: HttpClient,
              private messageService: MessageService) {
  }

  getOrders(): Observable<Order[]> {
    return this.httpclient.get<Order[]>(this.baseUrl);
  }

  getSingleOrder(id: number): Observable<Order> {
    return this.httpclient.get<Order>(`${this.baseUrl}${id}`);
  }

  delete(id: number) {
    this.messageService.openSnackBar(`Deleted an order with the id: ${id}`, 'Close');
    return this.httpclient.delete(`${this.baseUrl}${id}`);
  }

  update(id: number, data: Order): Observable<any> {
    this.messageService.openSnackBar(`Updated an order with the id: ${id}`, 'Close');
    return this.httpclient.put(`${this.baseUrl}${id}`, data);
  }

  create(order: Order): Observable<Order> {
    this.messageService.openSnackBar('Added new order', 'Close');
    return this.httpclient.post<Order>(this.baseUrl, order);
  }
}
