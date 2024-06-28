import { AuthService } from 'src/app/services/auth.service';
import { CitoyenService } from './../../../services/citoyen.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-chancelier',
  templateUrl: './chancelier.component.html',
  styleUrls: ['./chancelier.component.css']
})
export class ChancelierComponent implements OnInit {

  constructor(private AuthService: AuthService) { }

  ngOnInit() {
    this.AuthService.settype("chancelier")
  }


}
