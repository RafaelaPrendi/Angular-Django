import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Category} from "../models/category";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://127.0.0.1:8000/category/';

  constructor(private httpclient: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.httpclient.get<Category[]>(this.baseUrl);
  }

  getSingleCategory(id: number): Observable<Category> {
    return this.httpclient.get<Category>(`${this.baseUrl}/${id}`);
  }
}
