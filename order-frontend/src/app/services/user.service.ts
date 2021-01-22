import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://127.0.0.1:8000/users/';

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getSingleUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}${id}`);
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}info`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  delete(id: number): Observable<any> {
    this.messageService.openSnackBar(`Deleted a salesperson with the id: ${id}`, 'Close');
    return this.http.delete(`${this.baseUrl}${id}`);
  }

  update(id: number, data: User): Observable<any> {
    this.messageService.openSnackBar(`Updated a salespersonr with the id: ${id}`, 'Close');
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
