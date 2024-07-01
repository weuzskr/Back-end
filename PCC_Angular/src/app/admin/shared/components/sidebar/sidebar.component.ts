import { CitoyenService } from 'src/app/services/citoyen.service';
import { Component, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  constructor(private auth: AuthService, private router: Router, private CitoyenService: CitoyenService) { }

  logout(): void {
    this.auth.logout();
  }
  reset() {
    let user: any;
    let role: any;
    this.CitoyenService.setcitoyen_id(0);
    if (localStorage.getItem("userConnect")) {
      user = JSON.parse(localStorage.getItem("userConnect") || "");
    }
    role = user.user.role;


    if (role === "ROLE_USER") {
      this.router.navigate(['/chancelier']);
    } else if (role === "ROLE_ADMIN") {
      this.router.navigate(['/ministre']);

    }
  }
  gettype() {
    return this.auth.gettype();
  }



}
