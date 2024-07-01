import { Component, OnInit } from '@angular/core';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit {
  departements: any[] = [];
  searchTextdepartement = "";
  paginateddepartements: any[] = [];
  itemsPerPagedepartements: number = 5;
  currentPagedepartements: number = 1;
  totalPagesdepartements: number = 0;

  constructor(
    private departementService: DepartementService
  ) { }

  ngOnInit(): void {


    this.departementService.getDepartements().subscribe((departements: any[]) => {
      this.departements = departements;
      this.updateTotalPagesdepartements();
      this.paginatedepartements();
    });
  }

  updateTotalPagesdepartements() {
    this.totalPagesdepartements = Math.ceil(this.departements.length / this.itemsPerPagedepartements);
  }

  paginatedepartements(): void {
    const startIndex = (this.currentPagedepartements - 1) * this.itemsPerPagedepartements;
    const endIndex = startIndex + this.itemsPerPagedepartements;
    this.paginateddepartements = this.departements.slice(startIndex, endIndex);
  }

  goToPagedepartements(page: number): void {
    if (page >= 1 && page <= this.totalPagesdepartements) {
      this.currentPagedepartements = page;
      this.paginatedepartements();
    }
  }

  previousPagedepartements(): void {
    if (this.currentPagedepartements > 1) {
      this.currentPagedepartements--;
      this.paginatedepartements();
    }
  }

  nextPagedepartements(): void {
    if (this.currentPagedepartements < this.totalPagesdepartements) {
      this.currentPagedepartements++;
      this.paginatedepartements();
    }
  }

  getPagesdepartements(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPagesdepartements; i++) {
      pages.push(i);
    }
    return pages;
  }

  changeItemsPerPagedepartements(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const items = Number(target.value);
    this.itemsPerPagedepartements = items;
    this.currentPagedepartements = 1; // Reset to the first page
    this.updateTotalPagesdepartements();
    this.paginatedepartements();
  }
}
