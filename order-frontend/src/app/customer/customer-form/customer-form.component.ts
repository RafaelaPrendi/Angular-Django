import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../models/customer";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  formGroup!: FormGroup;
  titleAlert: string = 'This field is required';
  submitted = false;
  isUpdated = false;
  new_customer!: Customer;
  current_customer_id!: number;
  current_customer!: Customer;

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private router: Router,
              private activatedRouter: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.checkIfUpdate();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      company_name: [null, Validators.required],
    });
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    this.formGroup.reset({first_name: '', last_name: '', company_name: '',})
  }

  onSubmit() {
    //update
    if (this.isUpdated) {
      this.current_customer = this.formGroup.value;
      this.customerService.update(Number(this.current_customer_id), this.current_customer).subscribe(response => {
          console.log(response);
          this.router.navigate(['/customers']);
        }
        , error => console.log(error));
    } else {
      this.new_customer = this.createCustomer();
      this.customerService.create(this.new_customer).subscribe(response => {
          console.log('CREATE: ', response);
        },
        error => {
          console.log(error);
        });
      this.router.navigate(['/customers']);
    }
    this.submitted = true;
    this.rebuildForm();

  }

  checkIfUpdate() {
    this.current_customer_id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    if (this.current_customer_id) {
      this.isUpdated = true;
      this.customerService.getSingleCustomer(this.current_customer_id).subscribe(response => {
          // this.current_customer = response;
          this.formGroup.patchValue(response);
          console.log('FROM CHECKIFUPDATE', response);
        },
        error => {
          console.log(error);
        });
    }
  }

  createCustomer(): Customer {
    const formModel = this.formGroup.value;
    const saveCustomer: Customer = {
      first_name: formModel.first_name,
      last_name: formModel.last_name,
      company_name: formModel.company_name,
    } as Customer;
    return saveCustomer;
  }


}
