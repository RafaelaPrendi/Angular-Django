import { Component, OnInit } from '@angular/core';
import {Customer} from "../interfaces/customer";
import { CUSTOMERS} from "../mock-data/mock-customers";
import { CustomerService } from "../services/customer.service";
import { MessageService } from "../services/message.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers!: Customer[];
  selectedCustomer!: Customer;
  constructor(private customerService: CustomerService,
              private messageService: MessageService) {

  }
  getCustomers(): void{
    this.customerService.getCustomers()
      .subscribe(customers =>this.customers = customers);
  }

  ngOnInit(): void {
    this.getCustomers();
  }
  onSelect(customer: Customer): void{
    this.selectedCustomer = customer;
    this.messageService.add(`MessagesComponent: Selected customer id=${customer.id}`);
  }

}
