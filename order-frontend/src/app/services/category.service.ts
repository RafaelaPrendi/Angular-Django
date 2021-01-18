import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import { HttpClient} from "@angular/common/http";
import {Category} from "../models/category";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://127.0.0.1:8000/category/';

  constructor(private httpclient: HttpClient,
              private messageService: MessageService) { }

  getCategory(): Observable<Category[]>{
    this.messageService.add('CategoryService: fetched categories');
    return this.httpclient.get<Category[]>(this.baseUrl);
              }
}
