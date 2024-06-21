import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ProfessionService {
  constructor(private http: HttpClient) {}

  getProfessions(): Observable<any> {
    return this.http.get(`${url}/professions`);
  }
}
