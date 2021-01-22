import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {MessageService} from "./message.service";
import {Group} from "../models/Group";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrl = 'http://127.0.0.1:8000/groups/';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl);
  }

  getSingleGroup(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.baseUrl}${id}`);
  }
}
