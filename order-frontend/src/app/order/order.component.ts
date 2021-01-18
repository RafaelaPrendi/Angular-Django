import { Component, OnInit } from '@angular/core';
import {Order} from "../models/order"
import {OrderService} from "../services/order.service";
import {MessageService} from "../services/message.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = ["ID", "Code", "Code_Year", "Date Registered","Products"];
  orders!: Order[];
  selectedOrder!: Order;
  constructor(private messageService: MessageService, private orderService:OrderService) { }
getOrders(): void{
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
}
  ngOnInit(): void {
    this.getOrders();
  }
onSelect(order: Order): void {
  this.selectedOrder = order;
  this.messageService.add(`OrderComponent: selected order id=${order.id}`);
}
}
