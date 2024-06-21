import { CitoyenService } from 'src/app/services/citoyen.service';
import { Component, OnInit } from '@angular/core';
import { ConsulatService } from 'src/app/services/consulat.service';
import { PosteService } from 'src/app/services/poste.service';
import { JuridictionService } from 'src/app/services/juridiction.service';
import { RegionService } from 'src/app/services/region.service';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-ministre',
  templateUrl: './ministre.component.html',
  styleUrls: ['./ministre.component.css']
})
export class MinistreComponent implements OnInit {
  citoyens: any[] = [];
  consulats: any[] = [];
  postes: any[] = [];
  juridictions: any[] = [];
  regions: any[] = [];
  departements: any[] = [];

  // Variables pour les statistiques
  totalProfessions: number = 0;
  totalConsulats: number = 0;
  totalPostes: number = 0;
  totalJuridictions: number = 0;
  totalRegions: number = 0;
  totalDepartements: number = 0;

  constructor(
    private CitoyenService: CitoyenService,
    private consulatService: ConsulatService,
    private posteService: PosteService,
    private juridictionService: JuridictionService,
    private regionService: RegionService,
    private departementService: DepartementService,
  ) { }

  ngOnInit() {
    this.loadConsulats();
    this.loadPostes();
    this.loadJuridictions();
    this.loadRegions();
    this.loadDepartements();
    this.loadCitoyens();
  }

  loadConsulats(): void {
    this.consulatService.getConsulats().subscribe(
      (data) => {
        this.consulats = data.data;
        this.totalConsulats = this.consulats.length;
      },
      (error) => {
        console.error('Erreur lors de la récupération des consulats', error);
      }
    );
  }

  loadPostes(): void {
    this.posteService.getPostes().subscribe(
      (data) => {
        this.postes = data.data;
        this.totalPostes = this.postes.length;
      },
      (error) => {
        console.error('Erreur lors de la récupération des postes', error);
      }
    );
  }

  loadJuridictions(): void {
    this.juridictionService.getJuridictions().subscribe(
      (data) => {
        this.juridictions = data.data;
        this.totalJuridictions = this.juridictions.length;
      },
      (error) => {
        console.error('Erreur lors de la récupération des juridictions', error);
      }
    );
  }

  loadRegions(): void {
    this.regionService.getRegions().subscribe(
      (data) => {
        this.regions = data.data;
        this.totalRegions = this.regions.length;
      },
      (error) => {
        console.error('Erreur lors de la récupération des régions', error);
      }
    );
  }

  loadDepartements(): void {
    this.departementService.getDepartements().subscribe(
      (data) => {
        this.departements = data.data;
        this.totalDepartements = this.departements.length;
      },
      (error) => {
        console.error('Erreur lors de la récupération des départements', error);
      }
    );
  }

  loadCitoyens() {
    this.CitoyenService.getAllcitoyens().subscribe(
      (data) => {
        this.citoyens = data.citoyens;
      },
      (error) => {
        console.error('Erreur lors de la récupération des citoyens pour le ministre :', error);
      }
    );
  }
}
