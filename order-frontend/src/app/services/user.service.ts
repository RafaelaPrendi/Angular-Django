import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import {User} from "../models/user";
import {Customer} from "../models/customer";
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://127.0.0.1:8000/users/';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  constructor(private httpClient: HttpClient,
              private messageService: MessageService) { }
              getUsers(): Observable<User[]> {
                this.messageService.add('UserService: fetched users');
                return this.httpClient.get<User[]>(this.baseUrl);
              }        }
