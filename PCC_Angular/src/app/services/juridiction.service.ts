import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class JuridictionService {
  constructor(private http: HttpClient) { }

  getJuridictions(): Observable<any> {
    return this.http.get(`${url}/juridictions/tous`);
  }
}
