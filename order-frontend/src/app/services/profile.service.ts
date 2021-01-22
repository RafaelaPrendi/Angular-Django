import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const API_URL = 'http://localhost:8000/';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }
}
