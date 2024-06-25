import { CitoyenService } from './../../../services/citoyen.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-chancelier',
  templateUrl: './chancelier.component.html',
  styleUrls: ['./chancelier.component.css']
})
export class ChancelierComponent implements OnInit {

  citoyens: any[] = [];
  showConsulat: boolean = false;

  constructor(private CitoyenService: CitoyenService) { }

  ngOnInit() {
    // Récupérer les citoyens avec le consulat spécifique pour le ministre
    this.CitoyenService.getCitoyensByChancelier().subscribe(
      (data) => {
        this.citoyens = data;
        this.citoyens = data.citoyens;
        console.log("les citoyens pour le composant chancelier ", this.citoyens);
      },
      (error) => {
        console.error('Erreur lors de la récupération des citoyens pour le ministre :', error);
      }
    );
  }
}
