import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import {Customer} from "../models/customer";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://127.0.0.1:8000/customers/';
  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getCustomers(): Observable<Customer[]>{
    this.messageService.add('CustomerService: fetched customers');
    return this.http.get<Customer[]>(this.baseUrl)
      .pipe(catchError(this.handleError<Customer[]>('getCustomers', [])));
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, customer);
  }
}
