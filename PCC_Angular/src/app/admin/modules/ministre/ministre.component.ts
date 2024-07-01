import { CitoyenService } from 'src/app/services/citoyen.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ministre',
  templateUrl: './ministre.component.html',
  styleUrls: ['./ministre.component.css']
})
export class MinistreComponent implements OnInit {

  constructor(private AuthService: AuthService, private CitoyenService: CitoyenService) { }
  ngOnInit() {
    this.AuthService.settype("ministre")

  }
  get_id() {
    return this.CitoyenService.getcitoyen_id();
  }

}
