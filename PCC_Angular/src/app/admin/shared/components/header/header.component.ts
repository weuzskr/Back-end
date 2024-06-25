import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    // this.user = this.auth.Myprofile().subscribe(user => {
    //   this.user = user;
    // });
  }

}
