import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  constructor(private http: HttpClient) { }

  getRegions(): Observable<any> {
    return this.http.get(`${url}/regions/tous`);
  }
}
