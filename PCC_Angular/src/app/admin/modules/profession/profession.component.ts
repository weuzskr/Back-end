import { Component, OnInit, } from '@angular/core';
import { ProfessionService } from 'src/app/services/profession.service';
import { JuridictionService } from 'src/app/services/juridiction.service';

@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrl: './profession.component.css'
})
export class ProfessionComponent implements OnInit {
  professions: any[] = [];


  juridictions: any[] = [];
  searchTextprofession = "";
  paginatedprofessions: any[] = [];
  itemsPerPageprofessions: number = 5;
  currentPageprofessions: number = 1;
  totalPagesprofessions: number = 0;

  constructor(
    private juridictionService: JuridictionService,
    private professionService: ProfessionService
  ) { }

  ngOnInit(): void {
    this.juridictionService.getJuridictions().subscribe((juridictions: any[]) => {
      this.juridictions = juridictions;
    });

    this.professionService.getProfessions().subscribe((professions: any[]) => {
      this.professions = professions;
      this.updateTotalPagesprofessions();
      this.paginateprofessions();
    });
  }



  updateTotalPagesprofessions() {
    this.totalPagesprofessions = Math.ceil(this.professions.length / this.itemsPerPageprofessions);
  }

  paginateprofessions(): void {
    const startIndex = (this.currentPageprofessions - 1) * this.itemsPerPageprofessions;
    const endIndex = startIndex + this.itemsPerPageprofessions;
    this.paginatedprofessions = this.professions.slice(startIndex, endIndex);
  }

  goToPageprofessions(page: number): void {
    if (page >= 1 && page <= this.totalPagesprofessions) {
      this.currentPageprofessions = page;
      this.paginateprofessions();
    }
  }

  previousPageprofessions(): void {
    if (this.currentPageprofessions > 1) {
      this.currentPageprofessions--;
      this.paginateprofessions();
    }
  }

  nextPageprofessions(): void {
    if (this.currentPageprofessions < this.totalPagesprofessions) {
      this.currentPageprofessions++;
      this.paginateprofessions();
    }
  }

  getPagesprofessions(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPagesprofessions; i++) {
      pages.push(i);
    }
    return pages;
  }

  changeItemsPerPageprofessions(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const items = Number(target.value);
    this.itemsPerPageprofessions = items;
    this.currentPageprofessions = 1; // Reset to the first page
    this.updateTotalPagesprofessions();
    this.paginateprofessions();
  }

}
