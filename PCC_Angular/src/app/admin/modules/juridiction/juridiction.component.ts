import { CitoyenService } from 'src/app/services/citoyen.service';
import { Component, OnInit } from '@angular/core';
import { JuridictionService } from 'src/app/services/juridiction.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-juridiction',
  templateUrl: './juridiction.component.html',
  styleUrls: ['./juridiction.component.css']
})
export class JuridictionComponent implements OnInit {
  juridictions: any[] = [];
  citoyens: any[] = [];
  searchTextjuridiction = "";
  paginatedjuridictions: any[] = [];
  itemsPerPagejuridictions: number = 5;
  currentPagejuridictions: number = 1;
  totalPagesjuridictions: number = 0;

  constructor(
    private juridictionService: JuridictionService,
    private citoyenService: CitoyenService
  ) { }

  ngOnInit(): void {
    forkJoin([
      this.juridictionService.getJuridictions(),
      this.citoyenService.getAllcitoyens()
    ]).subscribe(([juridictions, citoyens]) => {
      this.juridictions = juridictions;
      this.citoyens = citoyens;
      this.addCitoyensNumberToJuridictions();
      this.updateTotalPagesjuridictions();
      this.paginatejuridictions();
    });
  }

  addCitoyensNumberToJuridictions(): void {
    this.juridictions.forEach(juridiction => {
      juridiction.citoyensNumber = this.getCitoyensByPosteId(juridiction.poste.id);
    });
  }

  getCitoyensByPosteId(posteId: number): number {

    const filteredCitoyens = this.citoyens.filter(citoyen => {
      const consulat = citoyen.consulat;
      const consulatPosteId = consulat?.poste?.id;
      return consulatPosteId === posteId;
    });
    return filteredCitoyens.length;
  }

  updateTotalPagesjuridictions() {
    this.totalPagesjuridictions = Math.ceil(this.juridictions.length / this.itemsPerPagejuridictions);
  }

  paginatejuridictions(): void {
    const startIndex = (this.currentPagejuridictions - 1) * this.itemsPerPagejuridictions;
    const endIndex = startIndex + this.itemsPerPagejuridictions;
    this.paginatedjuridictions = this.juridictions.slice(startIndex, endIndex);
  }

  goToPagejuridictions(page: number): void {
    if (page >= 1 && page <= this.totalPagesjuridictions) {
      this.currentPagejuridictions = page;
      this.paginatejuridictions();
    }
  }

  previousPagejuridictions(): void {
    if (this.currentPagejuridictions > 1) {
      this.currentPagejuridictions--;
      this.paginatejuridictions();
    }
  }

  nextPagejuridictions(): void {
    if (this.currentPagejuridictions < this.totalPagesjuridictions) {
      this.currentPagejuridictions++;
      this.paginatejuridictions();
    }
  }

  getPagesjuridictions(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPagesjuridictions; i++) {
      pages.push(i);
    }
    return pages;
  }

  changeItemsPerPagejuridictions(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const items = Number(target.value);
    this.itemsPerPagejuridictions = items;
    this.currentPagejuridictions = 1; // Reset to the first page
    this.updateTotalPagesjuridictions();
    this.paginatejuridictions();
  }
}
