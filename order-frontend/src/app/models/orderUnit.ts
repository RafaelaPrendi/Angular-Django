import {Product} from "./product";
import {Order} from "./order";

export class OrderUnit {
  product!: Product[];
  order!: Order[];
  price = 0;
  amount = 0;
}
