import {Component, OnInit} from '@angular/core';
import {Order} from "../../models/order";
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  // @ts-ignore
  public order: Order;

  constructor(private activatedRouter: ActivatedRoute,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(): void {
    let order_id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.orderService.getSingleOrder(order_id).subscribe(order => {
        this.order = order;
        console.log('ORDER ID: ', this.order.id);
        console.log(order);
      },
      error => {
        console.log(error);
      }
    );
  }
}
