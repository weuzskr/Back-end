import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user: any;
  userTitle: string = "";

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.getConnectedUser();
    this.userTitle = this.user.role === 'ROLE_USER' ? 'Chancelier' : 'Ministre';
  }

}
