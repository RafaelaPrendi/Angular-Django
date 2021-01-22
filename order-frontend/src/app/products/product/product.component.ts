import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ["ID", "Name", "Categories", "Default Price", "Description", "action"];

  products: Product[] = [];
  selectedProduct!: Product;

  constructor(private productService: ProductService,
              private router: Router,) {
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
        console.log(JSON.stringify(this.products));
      });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  add(): void {
    this.router.navigate(['/products/create'])
      .then(success => console.log('navigation success?', success))
      .catch(console.error);
  }

  edit(product: Product): void {
    this.router.navigate([`products/${product.id}`]);
  }

  delete(product: Product): void {
    this.productService.delete(product.id).subscribe(
      response => {
        this.router.navigate(['/products'])
          .then(success => console.log('navigation success?', success))
          .catch(console.error);
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
