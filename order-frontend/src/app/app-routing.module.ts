import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from "./customers/customers.component";
import {ProductComponent} from "./product/product.component";
import {CategoryComponent} from "./category/category.component";
import {OrderComponent} from "./order/order.component";
import {UserDetailsComponent} from "./user-details/user-details.component";

const routes: Routes = [
  { path: 'customers', component: CustomersComponent},
  { path: 'products', component: ProductComponent},
  { path: 'category', component: CategoryComponent},
  { path: 'orders', component: OrderComponent},
  { path: 'users', component: UserDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
