import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class PosteService {
  constructor(private http: HttpClient) { }

  getPostes(): Observable<any> {
    return this.http.get(`${url}/postes`);
  }
}
