import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from "./customers/customers.component";
import {ProductComponent} from "./product/product.component";
import {CategoryComponent} from "./category/category.component";
import {OrderComponent} from "./order/order.component";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {BoardAdminComponent} from "./board-admin/board-admin.component";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {BoardSalesComponent} from "./board-sales/board-sales.component";

const routes: Routes = [
  { path: 'customers', component: CustomersComponent},
  { path: 'products', component: ProductComponent},
  { path: 'category', component: CategoryComponent},
  { path: 'orders', component: OrderComponent},
  { path: 'users', component: UserDetailsComponent},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'user', component: BoardSalesComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
