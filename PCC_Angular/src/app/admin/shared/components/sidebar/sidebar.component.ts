import { CitoyenService } from 'src/app/services/citoyen.service';
import { Component, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  constructor(private auth: AuthService, private CitoyenService: CitoyenService) { }

  logout(): void {
    this.auth.logout();
  }
  // getid(): number {
  //   return this.CitoyenService.getcitoyen_id();
  // }
  reset() {
    this.CitoyenService.setcitoyen_id(0);
  }
  gettype() {
    return this.auth.gettype();
  }



}
