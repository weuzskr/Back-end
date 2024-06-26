import { CitoyenService } from './../../../../services/citoyen.service';

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChancelierComponent } from 'src/app/admin/modules/chancelier/chancelier.component';
import { MinistreComponent } from 'src/app/admin/modules/ministre/ministre.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  SearchText = "";
  citoyens: any[] = [];
  @Input() showConsulat: any;
  @Input() type!: string;
  paginatedCitoyens: any[] = [];
  itemsPerPage: number = 2;
  currentPage: number = 1;
  totalPages: number = 0;
  @ViewChild(MinistreComponent) ministre!: MinistreComponent;
  @ViewChild(ChancelierComponent) chancelier!: ChancelierComponent;

  constructor(private CitoyenService: CitoyenService) { }

  ngOnInit() {
    // console.log("Le type de l'utilisateur connecté", this.type);

    if (this.type == "ministre") {
      this.loadCitoyens();
    } else if (this.type == "chancelier") {
      this.loardcitoyenbychancelier();
    }
  }

  loadCitoyens() {
    this.CitoyenService.getAllcitoyens().subscribe(
      (response) => {
        this.citoyens = response;
        this.totalPages = Math.ceil(this.citoyens.length / this.itemsPerPage);
        this.paginateCitoyens();
        console.log("Citoyens du composants ministre", this.citoyens);
      },
      (error) => {
        console.error('Erreur lors de la récupération des citoyens pour le ministre :', error);
      }
    );
  }

  loardcitoyenbychancelier() {
    // Récupérer les citoyens avec le consulat spécifique pour chancelier
    this.CitoyenService.getCitoyensByChancelier().subscribe(
      (data) => {
        this.citoyens = data;
        this.totalPages = Math.ceil(this.citoyens.length / this.itemsPerPage);
        this.paginateCitoyens();
        // console.log("les citoyens pour le composant chancelier ", this.citoyens);
      },
      (error) => {
        console.error('Erreur lors de la récupération des citoyens pour le chancelier :', error);
      }
    );
  }

  paginateCitoyens(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCitoyens = this.citoyens.slice(startIndex, endIndex);
    // console.log("les citoyens apres la pagination", this.paginatedCitoyens);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateCitoyens();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateCitoyens();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateCitoyens();
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
