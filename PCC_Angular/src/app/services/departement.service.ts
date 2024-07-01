import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  constructor(private http: HttpClient) { }

  getDepartements(): Observable<any> {
    return this.http.get(`${url}/departements/tous`);
  }
}
