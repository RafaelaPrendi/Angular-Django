import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from "../models/customer";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://127.0.0.1:8000/customers/';

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl)
      .pipe(catchError(this.handleError<Customer[]>('getCustomers', [])));
  }

  getSingleCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}${id}`);
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, customer);
  }

  delete(id: number): Observable<any> {
    this.messageService.openSnackBar(`Deleted a customer with the id: ${id}`, 'Close');
    return this.http.delete(`${this.baseUrl}${id}`);
  }

  update(id: number, data: Customer): Observable<any> {
    this.messageService.openSnackBar(`Updated a customer with the id: ${id}`, 'Close');
    return this.http.put(`${this.baseUrl}${id}`, data);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
