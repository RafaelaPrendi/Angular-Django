import {Component, OnInit} from '@angular/core';
import {Customer} from "../../models/customer";
import {CustomerService} from "../../services/customer.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  displayedColumns: string[] = ["ID", "First Name", "Last Name", "Company Name", "action"];
  customers!: Customer[];
  selectedCustomer!: Customer;

  constructor(private customerService: CustomerService,
              private router: Router,) {

  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  onSelect(customer: Customer): void {
    this.selectedCustomer = customer;
  }

  add(): void {
    this.router.navigate(['/customers/create'])
      .then(success => console.log('navigation success?', success))
      .catch(console.error);
  }

  edit(customer: Customer): void {
    this.router.navigate([`customers/${customer.id}`]);
  }

  delete(customer: Customer): void {
    this.customerService.delete(customer.id).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/customers'])
          .then(success => console.log('navigation success?', success))
          .catch(console.error);
      },
      error => {
        console.log(error);
      }
    );
  }
}
