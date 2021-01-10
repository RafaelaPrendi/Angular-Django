import { Component, OnInit } from '@angular/core';
import {Product} from "../interfaces/product";
import {MessageService} from "../services/message.service";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products!: Product[];
  selectedProduct!: Product;
  constructor(private messageService: MessageService,
              private productService: ProductService) { }

  getProducts():void {
    this.productService.getProducts()
      .subscribe(products =>this.products = products);
              }
  ngOnInit(): void {
    this.getProducts();
  }
onSelect(product: Product): void{
    this.selectedProduct = product;
    this.messageService.add(`MessageComponent: Selected product id=${product.id}`);
}
}
