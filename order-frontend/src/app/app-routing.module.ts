import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomersComponent} from "./customer/customers/customers.component";
import {ProductComponent} from "./products/product/product.component";
import {CategoryComponent} from "./category/category.component";
import {OrderComponent} from "./orders/order/order.component";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {CustomerFormComponent} from "./customer/customer-form/customer-form.component";
import {ProductFormComponent} from "./products/product-form/product-form.component";
import {OrderFormComponent} from "./orders/order-form/order-form.component";
import {OrderDetailsComponent} from "./orders/order-details/order-details.component";
import {UserFormComponent} from "./user-form/user-form.component";
import {AuthGuard} from "./services/auth.service";

const routes: Routes = [
  {path: 'customers', component: CustomersComponent, canActivate: [AuthGuard]},
  {path: 'customers/create', component: CustomerFormComponent, canActivate: [AuthGuard]},
  {path: 'customers/:id', component: CustomerFormComponent, canActivate: [AuthGuard]},
  //routes for product
  {path: 'products', component: ProductComponent, canActivate: [AuthGuard]},
  {path: 'products/create', component: ProductFormComponent, canActivate: [AuthGuard]},
  {path: 'products/:id', component: ProductFormComponent, canActivate: [AuthGuard]},
  //router for orders
  {path: 'orders', component: OrderComponent, canActivate: [AuthGuard]},
  {path: 'orders/create', component: OrderFormComponent, canActivate: [AuthGuard]},
  {path: 'orders/:id', component: OrderFormComponent, canActivate: [AuthGuard]},
  {path: 'order-detail/:id', component: OrderDetailsComponent, canActivate: [AuthGuard]},
  // routes for users (sales)
  {path: 'users', component: UserDetailsComponent, canActivate: [AuthGuard]},
  {path: 'users/create', component: UserFormComponent, canActivate: [AuthGuard]},
  {path: 'users/:id', component: UserFormComponent, canActivate: [AuthGuard]},

  {path: 'category', component: CategoryComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  // { path: '', redirectTo: 'AppComponent', pathMatch: 'full'},
  {path: '', redirectTo: 'home', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
