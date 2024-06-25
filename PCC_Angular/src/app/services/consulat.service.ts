import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from './apiUrl';

@Injectable({
    providedIn: 'root'
})
export class ConsulatService {
    constructor(private http: HttpClient) { }

    getConsulats(): Observable<any> {
        return this.http.get(`${url}/consulats`);
    }
}
