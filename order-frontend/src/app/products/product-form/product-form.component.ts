import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  formGroup!: FormGroup;
  titleAlert: string = 'This field is required';
  submitted = false;
  new_product!: Product;
  old_product!: Product;
  old_product_id!: number;
  categoryList!: Category[];
  isUpdate: boolean = false;

  constructor(private  formBuilder: FormBuilder,
              private productService: ProductService,
              private  categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }


  ngOnInit(): void {
    this.createForm();
    this.categoryService.getCategories().subscribe(response => {
      this.categoryList = response;
    });
    this.checkIfUpdate();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      categories: [null, Validators.required],
      default_price: [0, Validators.required],
      description: ['', Validators.required],
    });

  }

  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    this.formGroup.reset({first_name: this.new_product.name});
  }

  checkIfUpdate() {
    this.old_product_id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.old_product_id) {
      this.isUpdate = true;
      this.productService.getSingleProduct(this.old_product_id).subscribe(response => {
          this.formGroup.patchValue(response);
        },
        error => {
          console.log(error);
        });
    }
  }

  onSubmit() {
    if (this.isUpdate) {
      this.old_product = this.formGroup.value;
      this.productService.update(this.old_product_id, this.old_product).subscribe(response => {
          console.log(response);
          this.router.navigate(['/products']);
        }
        , error => console.log(error));
    } else {
      this.new_product = this.formGroup.value;
      console.log('CATEGORY IS', this.new_product.categories);
      this.productService.create(this.new_product).subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        }
      );
    }
    this.submitted = true;
    this.router.navigate(['/products']);
    this.rebuildForm();
  }
}
