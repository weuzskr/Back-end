import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ministre',
  templateUrl: './ministre.component.html',
  styleUrls: ['./ministre.component.css']
})
export class MinistreComponent implements OnInit {
  data: any[] = [];

  constructor(private AuthService: AuthService) { }

  ngOnInit() {
    this.AuthService.settype("ministre")
  }
}
