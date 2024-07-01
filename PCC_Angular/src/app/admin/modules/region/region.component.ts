import { RegionService } from './../../../services/region.service';
import { CitoyenService } from 'src/app/services/citoyen.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrl: './region.component.css'
})
export class RegionComponent implements OnInit {
  regions: any[] = [];
  citoyens: any[] = [];
  searchTextRegion = "";
  paginatedRegions: any[] = [];
  itemsPerPageRegions: number = 5;
  currentPageRegions: number = 1;
  totalPagesRegions: number = 0;

  constructor(
    private citoyenService: CitoyenService,
    private regionService: RegionService
  ) { }

  ngOnInit(): void {
    forkJoin([
      this.regionService.getRegions(),
      this.citoyenService.getAllcitoyens()
    ]).subscribe(([regions, citoyens]) => {
      this.regions = regions;
      this.citoyens = citoyens;
      this.updateTotalPagesRegions();
      this.paginateRegions();
      this.calculateCitoyensNumber();
    })
  }



  updateTotalPagesRegions() {
    this.totalPagesRegions = Math.ceil(this.regions.length / this.itemsPerPageRegions);
  }

  paginateRegions(): void {
    const startIndex = (this.currentPageRegions - 1) * this.itemsPerPageRegions;
    const endIndex = startIndex + this.itemsPerPageRegions;
    this.paginatedRegions = this.regions.slice(startIndex, endIndex);
  }

  goToPageRegions(page: number): void {
    if (page >= 1 && page <= this.totalPagesRegions) {
      this.currentPageRegions = page;
      this.paginateRegions();
    }
  }

  previousPageRegions(): void {
    if (this.currentPageRegions > 1) {
      this.currentPageRegions--;
      this.paginateRegions();
    }
  }

  nextPageRegions(): void {
    if (this.currentPageRegions < this.totalPagesRegions) {
      this.currentPageRegions++;
      this.paginateRegions();
    }
  }

  getPagesRegions(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPagesRegions; i++) {
      pages.push(i);
    }
    return pages;
  }

  changeItemsPerPageRegions(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const items = Number(target.value);
    this.itemsPerPageRegions = items;
    this.currentPageRegions = 1; // Reset to the first page
    this.updateTotalPagesRegions();
    this.paginateRegions();
  }

  calculateCitoyensNumber(): void {
    this.regions.forEach(region => {
      const regionId = region.consulat?.id;
      const citoyensNumber = this.citoyens.filter((citoyen: any) => citoyen?.consulat?.id === regionId).length;
      region.citoyensNumber = citoyensNumber;
    });
  }

}
