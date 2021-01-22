import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from "../../services/customer.service";
import {Order} from "../../models/order";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../../models/customer";
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {OrderService} from "../../services/order.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  isUpdated = false;
  current_order_id!: number;
  new_order!: Order;
  current_order!: Order;
  customers!: Customer[];
  products!: Product[];
  selectedProduct!: Product;


  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private productService: ProductService,
              private orderService: OrderService,
              private router: Router,
              private activatedRouter: ActivatedRoute,
              private datepipe: DatePipe,) {
  }

  get OrderUnitFormArray(): FormArray {
    // return  this.formGroup.controls.order_units as FormArray;
    return this.formGroup.get('order_units') as FormArray;
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
      console.log(customers);
    }, error => console.log(error));
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      console.log(products);
    }, error => console.log(error));
  }

  ngOnInit(): void {
    this.getCustomers();
    this.getProducts();
    this.createForm();
  }

  createOuFG() {
    return this.formBuilder.group({
      product: [null, Validators.required],
      price: [0, {disabled: true}, Validators.required],
      amount: [0, Validators.required]
    });
  }

  removeOrderUnit(i: number) {
    this.OrderUnitFormArray.removeAt(i);
  }

  // @ts-ignore
  addOrderUnit(orderUnit?) {
    const orderUnitFormGroup = this.createOuFG();
    if (orderUnit) {
      orderUnitFormGroup.patchValue(orderUnit);
    }
    this.OrderUnitFormArray.push(orderUnitFormGroup);
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      code: [0, Validators.required],
      code_year: [0, Validators.required],
      date_register: [null, Validators.required],
      customer_id: [null, Validators.required],
      order_units: this.formBuilder.array([]),
    });
    this.current_order_id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    if (this.current_order_id) {
      this.isUpdated = true;
      this.orderService.getSingleOrder(this.current_order_id).subscribe(response => {
          this.formGroup.patchValue(response);
          console.log('server order data', response);
          for (const ou of response.order_units) {
            this.addOrderUnit(ou);
          }
        },
        error => {
          console.log(error);
        });
    } else {
      this.addOrderUnit();
    }
  }

  rebuildForm() {
    this.formGroup.reset(
      {
        date_register: '',
        customer_id: '',
        creator_id: '',
      })
  }

  formatDate(order: Order) {
    order.date_register = this.formGroup.controls.date_register.value;
    order.date_register = <string>this.datepipe.transform(order.date_register, 'YYYY-MM-dd');
  }

  show() {
    this.new_order = this.formGroup.value;
    this.formatDate(this.new_order);
    console.log(this.new_order);

  }

  onSubmit() {
    if (this.isUpdated) {
      this.current_order = this.formGroup.value;
      this.formatDate(this.current_order);
      this.orderService.update(this.current_order_id, this.current_order).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/orders'])
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.new_order = this.formGroup.value;
      this.formatDate(this.new_order);
      console.log('NEW ORDER', this.new_order);
      this.orderService.create(this.new_order).subscribe(
        response => {
          console.log(response);
        }, error => console.log(error)
      );
    }
    this.submitted = true;
    this.rebuildForm();
  }
}

