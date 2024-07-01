import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from './apiUrl';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { sweetAlertMessage } from './sweetAlert/alert.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  // Variable superglobale pour l'authentification 
  isAuthenticated = false;
  private type: string = "";
  settype(type: string) {
    this.type = type;
  }
  gettype() {
    return this.type;
  }

  login(user: any) {
    // return this.http.post(`${url}/login`, user)
    return this.http.post(`${url}/login`, user)
  }

  getAllChancelier() {
    return this.http.get(`${url}/admins/by-role`)
  }

  // Logout du backend 
  logoutAPI() {
    return this.http.get(`${url}/logout`)
  }

  Myprofile() {
    return this.http.get(`${url}/user`)
  }



  logout() {
    this.router.navigate(['/']);
    sweetAlertMessage('success', "Deconnexion reussi", "Vous avez été deconnecter de la plateforme")
    localStorage.setItem("userConnect", JSON.stringify(""));
  }
}
