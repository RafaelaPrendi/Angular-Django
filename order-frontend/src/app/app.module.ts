import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatIconModule} from "@angular/material/icon";
import { MatSidenavModule} from "@angular/material/sidenav";
import { MatListModule} from "@angular/material/list";
import { MatButtonModule} from "@angular/material/button";
import { UserDetailsComponent } from './user-details/user-details.component';

import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomersComponent } from './customers/customers.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CategoryComponent } from './category/category.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CustomerFormComponent } from './customer-form/customer-form.component'; // <-- NgModel lives here

import {MatInputModule} from "@angular/material/input";
import { MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import { ProductFormComponent } from './product-form/product-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardSalesComponent } from './board-sales/board-sales.component';
import {HttpClient} from "@angular/common/http";
// @ts-ignore
import { authInterceptorProviders } from "./_helpers/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    CustomerDetailsComponent,
    NavbarComponent,
    CustomersComponent,
    MessagesComponent,
    ProductComponent,
    ProductDetailsComponent,
    CategoryComponent,
    OrderComponent,
    OrderDetailsComponent,
    CustomerFormComponent,
    ProductFormComponent,
    UserFormComponent,
    OrderFormComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardSalesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
