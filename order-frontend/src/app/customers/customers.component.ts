import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {Customer} from "../models/customer";
import { CustomerService } from "../services/customer.service";
import { MessageService } from "../services/message.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ["ID", "First Name", "Last Name", "Company Name"];
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
