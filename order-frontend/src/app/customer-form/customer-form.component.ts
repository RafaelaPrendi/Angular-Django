import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {CustomerService} from "../services/customer.service";
import {Customer} from "../models/customer";

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  formGroup!: FormGroup;
  titleAlert: string = 'This field is required';
  submitted = false;
  new_customer!: Customer;

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService) { }

  ngOnInit(): void {
    this.createForm();
    // this.setChangeValidate();
  }
  createForm(){
   this.formGroup = this.formBuilder.group({
     first_name: '',
     last_name: '',
     company_name: '',
   });
  }
  ngOnChanges(){
    this.rebuildForm();
  }
  rebuildForm(){
    this.formGroup.reset({first_name: this.new_customer.first_name})
  }

  onSubmit(){
    this.new_customer = this.createCustomer();
    this.submitted = true;
    this.rebuildForm();
    this.customerService.create(this.new_customer).subscribe(  response => {
        console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      });
  }


  createCustomer(): Customer{
    const formModel = this.formGroup.value;
    const saveCustomer: Customer = {
      first_name: formModel.first_name,
      last_name: formModel.last_name,
      company_name: formModel.company_name,
    } as Customer;
    return saveCustomer;
  }


}
