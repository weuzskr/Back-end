import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class CitoyenService {

  constructor(private http: HttpClient) { }

  // Fonction pour enroller un citoyen
  createCitoyen(data: any): Observable<any> {
    return this.http.post(`${url}/citoyens`, data);
  }
  // Recuperer la listes des citoyens
  getAllcitoyens() {
    return this.http.get<any>(`${url}/citoyens`);
    // return this.http.get<any>(`http://127.0.0.1:8080/api/citoyens/`);
  }

  // Fonction pour récupérer les citoyens par chancelier
  getCitoyensByChancelier(): Observable<any> {
    return this.http.get<any>(`${url}/admin/citoyens`);
    // return this.http.get<any>(`http://127.0.0.1:8080/api/citoyens/`);

  }
  deleteCitoyen(id: number): Observable<any> {
    return this.http.delete(`${url}/citoyens/${id}`);
  }
}