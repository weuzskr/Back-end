import { CitoyenService } from 'src/app/services/citoyen.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  citoyen: any = {};


  searchTextFamille = "";
  searchTextAttache = "";
  paginatedFamilles: any[] = [];
  paginatedAttaches: any[] = [];
  itemsPerPageAttaches: number = 5; // Par défaut, 5 éléments par page
  itemsPerPageFamilles: number = 5; // Par défaut, 5 éléments par page
  currentPageAttaches: number = 1;
  currentPageFamilles: number = 1;
  totalPagesAttaches: number = 0;
  totalPagesFamilles: number = 0;
  // private _citoyen_id: number = 0;

  // @Input()
  // set citoyen_id(value: number) {
  //   this._citoyen_id = value;
  //   if (this._citoyen_id !== 0) {
  //     this.loadCitoyen();
  //   }
  // }

  // get citoyen_id(): number {
  //   return this._citoyen_id;
  // }
  getid(): number {
    return this.citoyenService.getcitoyen_id();
  }


  constructor(private citoyenService: CitoyenService) { }

  loadCitoyen(): void {
    // Appelez le service pour charger les détails du citoyen par ID
    // this.citoyenService.getCitoyensById(this._citoyen_id).subscribe(
    this.citoyenService.getCitoyensById(this.citoyenService.getcitoyen_id()).subscribe(
      (data) => {
        this.citoyen = data;

        console.log("Le citoyent recuperer dans le composant overview", this.citoyen);
        this.updateTotalPagesFamilles();
        this.paginateFamilles();
        this.updateTotalPagesAtttaches();
        this.paginateAttaches();
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du citoyen:', error);
      }
    );
  }
  updateTotalPagesFamilles() {
    this.totalPagesFamilles = Math.ceil(this.citoyen.familles.length / this.itemsPerPageFamilles);
  }
  updateTotalPagesAtttaches() {
    this.totalPagesAttaches = Math.ceil(this.citoyen.attacherFamilliales.length / this.itemsPerPageAttaches);
  }

  paginateAttaches(): void {
    const startIndex = (this.currentPageAttaches - 1) * this.itemsPerPageAttaches;
    const endIndex = startIndex + this.itemsPerPageAttaches;
    this.paginatedAttaches = this.citoyen.attacherFamilliales.slice(startIndex, endIndex);
  }
  paginateFamilles(): void {
    const startIndex = (this.currentPageFamilles - 1) * this.itemsPerPageFamilles;
    const endIndex = startIndex + this.itemsPerPageFamilles;
    this.paginatedFamilles = this.citoyen.familles.slice(startIndex, endIndex);
  }
  goToPageFamilles(page: number): void {
    if (page >= 1 && page <= this.totalPagesFamilles) {
      this.currentPageFamilles = page;
      this.paginateFamilles();
    }
  }
  goToPageAttaches(page: number): void {
    if (page >= 1 && page <= this.totalPagesAttaches) {
      this.currentPageAttaches = page;
      this.paginateAttaches();
    }
  }

  previousPageFamilles(): void {
    if (this.currentPageFamilles > 1) {
      this.currentPageFamilles--;
      this.paginateFamilles();
    }
  }
  previousPageAttaches(): void {
    if (this.currentPageAttaches > 1) {
      this.currentPageAttaches--;
      this.paginateAttaches();
    }
  }

  nextPageAttaches(): void {
    if (this.currentPageAttaches < this.totalPagesAttaches) {
      this.currentPageAttaches++;
      this.paginateAttaches();
    }
  }
  nextPageFamilles(): void {
    if (this.currentPageFamilles < this.totalPagesFamilles) {
      this.currentPageFamilles++;
      this.paginateFamilles();
    }
  }

  getPagesFamilles(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPagesFamilles; i++) {
      pages.push(i);
    }
    return pages;
  }
  getPagesAttaches(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPagesAttaches; i++) {
      pages.push(i);
    }
    return pages;
  }

  changeItemsPerPageFamilles(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const items = Number(target.value);
    this.itemsPerPageFamilles = items;
    this.currentPageFamilles = 1; // Réinitialise à la première page
    this.updateTotalPagesFamilles();
    this.paginateFamilles();
  }
  changeItemsPerPageAttaches(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const items = Number(target.value);
    this.itemsPerPageAttaches = items;
    this.currentPageAttaches = 1; // Réinitialise à la première page
    this.updateTotalPagesAtttaches();
    this.paginateAttaches();
  }


}
