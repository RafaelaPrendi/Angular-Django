import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {ProductService} from "../services/product.service";
import {Product} from "../models/product";
import {Category} from "../models/category";
import {CategoryService} from "../services/category.service";


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
  categories!: Category[];


  constructor(private  formBuilder: FormBuilder,
              private productService: ProductService,
              private  categoryService: CategoryService) { }

  ngOnInit(): void {
    this.createForm();

  }

createForm(){
    this.formGroup = this.formBuilder.group({
      name: '',
      categories: this.formBuilder.array([]),
      default_price: '',
      description: '',
    });
}

addObj(input: HTMLInputElement){
    const group = new FormGroup({
      // name: new FormArray(input.value)
    })
  this.categoryObj.push(group);
    input.value = ''
}
removeObj(index: number){
    this.categoryObj.removeAt(index);
}
get categoryObj(){
    return this.formGroup.get('categories') as FormArray
}
// get secretCategories(): FormArray{
//     return this.formGroup.get('categories') as FormArray;
// }
// setCategory(categories: Category[]){
//     const categoryFG = categories.map(category =>this.formBuilder.group(category));
//     const categoryFormArray = this.formBuilder.array(categoryFG);
//     this.formGroup.setControl('categories', categoryFormArray);
// }
//
// addCategory(){
//     this.secretCategories.push(this.formBuilder.group(this.categories));
// }

  ngOnChanges(){
    this.rebuildForm();
  }
  rebuildForm(){
    this.formGroup.reset({first_name: this.new_product.name});
  }

  createProduct(): Product{
    const  formModel = this.formGroup.value;

    // prep categories
    // const secretCategoriesDeepCopy: Category[] =
    //   formModel.secretCategories.map((category: Category) =>Object.assign({}, category));
    const saveProduct: Product = {
      name: formModel.name,
      categories: [],
      default_price: formModel.default_price,
      description: formModel.description,
    } as Product;


    return saveProduct;
  }
  onSubmit(){
    this.new_product = this.createProduct();
    this.submitted = true;
    this.rebuildForm();
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
}
