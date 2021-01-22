import {Component, OnInit} from '@angular/core';
import {Order} from "../../models/order"
import {OrderService} from "../../services/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = ["ID", "Date Registered", "See More", "Action"];
  orders!: Order[];
  selectedOrder!: Order;

  constructor(private orderService: OrderService,
              private router: Router) {
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => {
        this.orders = orders;
        console.log(orders);
      },
      error => console.log(error));
  }

  ngOnInit(): void {
    this.getOrders();

  }

  onSelect(order: Order): void {
    this.selectedOrder = order;
  }

  add(): void {
    this.router.navigate(['/orders/create'])
      .then(success => console.log('navigation success?', success))
      .catch(console.error);
  }

  edit(order: Order): void {
    this.router.navigate([`orders/${order.id}`]);
  }

  detail(order: Order): void {
    //console.log('ID=', order.id);
    this.router.navigateByUrl(`order-detail/${order.id}`).then(success => console.log('navigation success?', success))
      .catch(console.error);
    // this.router.navigate([`order-detail/${order.id}`]);
  }

  delete(order: Order): void {
    this.orderService.delete(order.id).subscribe(
      response => {
        console.log(response);
        // this.messageService.openSnackBar("Deleted order","check it out");
        this.router.navigate(['/orders'])
          .then(success => console.log('navigation success?', success))
          .catch(console.error);
      },
      error => {
        console.log(error);
      }
    );
  }
}
