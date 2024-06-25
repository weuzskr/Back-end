import { CitoyenService } from './../../../services/citoyen.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-chancelier',
  templateUrl: './chancelier.component.html',
  styleUrls: ['./chancelier.component.css']
})
export class ChancelierComponent implements OnInit {

  citoyens: any[] = [];
  type: string = "chancelier";
  showConsulat: boolean = false;

  constructor(private CitoyenService: CitoyenService) { }

  ngOnInit() {

    // this.loardcitoyenbychancelier();
  }

}
