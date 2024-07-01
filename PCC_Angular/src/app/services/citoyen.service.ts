import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class CitoyenService {

  private citoyen_id: number = 0;
  constructor(private http: HttpClient) { }

  getcitoyen_id(): number {
    return this.citoyen_id;
  }
  setcitoyen_id(id: number) {
    this.citoyen_id = id;
  }
  // Fonction pour enroller un citoyen
  createCitoyen(data: any): Observable<any> {
    return this.http.post(`${url}/citoyens/enroler`, data);
  }
  // Recuperer la listes des citoyens
  getAllcitoyens() {
    return this.http.get<any>(`${url}/citoyens/tous`);
  }

  // Fonction pour récupérer les citoyens par chancelier
  getCitoyensByChancelier(consulat_id: number): Observable<any> {
    return this.http.get<any>(`${url}/citoyens/par-admin/${consulat_id}`);

  }
  // Fonction pour récupérer les citoyens par chancelier
  getCitoyensById(id: number): Observable<any> {
    return this.http.get<any>(`${url}/citoyens/par-id/${id}`);

  }
  deleteCitoyen(id: number): Observable<any> {
    return this.http.delete(`${url}/citoyens/${id}`);
  }
}