import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import { HttpClient} from "@angular/common/http";
import {Category} from "../interfaces/category";
import {CATEGORIES} from "../mock-data/mock_category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpclient: HttpClient,
              private messageService: MessageService) { }

  getCategory(): Observable<Category[]>{
    this.messageService.add('CategoryService: fetched categories');
    return of(CATEGORIES);
              }
}
