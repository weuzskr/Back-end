import { Component, OnInit } from '@angular/core';
import { ConsulatService } from 'src/app/services/consulat.service';
import { JuridictionService } from 'src/app/services/juridiction.service';
import { CitoyenService } from 'src/app/services/citoyen.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-consulat',
  templateUrl: './consulat.component.html',
  styleUrls: ['./consulat.component.css']
})
export class ConsulatComponent implements OnInit {
  consulats: any[] = [];
  citoyens: any[] = [];
  searchTextconsulat = "";
  paginatedconsulats: any[] = [];
  itemsPerPageconsulats: number = 5;
  currentPageconsulats: number = 1;
  totalPagesconsulats: number = 0;

  constructor(
    private consulatService: ConsulatService,
    private citoyenService: CitoyenService
  ) { }

  ngOnInit(): void {
    forkJoin([
      this.consulatService.getConsulats(),
      this.citoyenService.getAllcitoyens()
    ]).subscribe(([consulats, citoyens]) => {
      this.consulats = consulats;
      this.citoyens = citoyens;
      this.updateTotalPagesconsulats();
      this.paginateconsulats();
      this.calculateCitoyensNumber();
    })
  }

  updateTotalPagesconsulats() {
    this.totalPagesconsulats = Math.ceil(this.consulats.length / this.itemsPerPageconsulats);
  }

  paginateconsulats(): void {
    const startIndex = (this.currentPageconsulats - 1) * this.itemsPerPageconsulats;
    const endIndex = startIndex + this.itemsPerPageconsulats;
    this.paginatedconsulats = this.consulats.slice(startIndex, endIndex);
  }

  goToPageconsulats(page: number): void {
    if (page >= 1 && page <= this.totalPagesconsulats) {
      this.currentPageconsulats = page;
      this.paginateconsulats();
    }
  }

  previousPageconsulats(): void {
    if (this.currentPageconsulats > 1) {
      this.currentPageconsulats--;
      this.paginateconsulats();
    }
  }

  nextPageconsulats(): void {
    if (this.currentPageconsulats < this.totalPagesconsulats) {
      this.currentPageconsulats++;
      this.paginateconsulats();
    }
  }

  getPagesconsulats(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPagesconsulats; i++) {
      pages.push(i);
    }
    return pages;
  }

  changeItemsPerPageconsulats(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const items = Number(target.value);
    this.itemsPerPageconsulats = items;
    this.currentPageconsulats = 1;
    this.updateTotalPagesconsulats();
    this.paginateconsulats();
  }

  calculateCitoyensNumber(): void {
    this.consulats.forEach(consulat => {
      const consulatId = consulat.id;
      const citoyensNumber = this.citoyens.filter((citoyen: any) => citoyen?.consulat?.id === consulatId).length;
      consulat.citoyensNumber = citoyensNumber;
    });
  }
}
