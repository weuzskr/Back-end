import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { PosteService } from 'src/app/services/poste.service';
import { JuridictionService } from 'src/app/services/juridiction.service';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrl: './poste.component.css'
})
export class posteComponent implements OnInit, OnDestroy {
  postes: any[] = [];
  private root!: am5.Root;

  juridictions: any[] = [];
  searchTextposte = "";
  paginatedpostes: any[] = [];
  itemsPerPagepostes: number = 5;
  currentPagepostes: number = 1;
  totalPagespostes: number = 0;

  constructor(
    private zone: NgZone,
    private juridictionService: JuridictionService,
    private posteService: PosteService
  ) { }

  ngOnInit(): void {
    this.juridictionService.getJuridictions().subscribe((juridictions: any[]) => {
      this.juridictions = juridictions;
    });

    this.posteService.getPostes().subscribe((postes: any[]) => {
      this.postes = postes;
      this.updateTotalPagespostes();
      this.paginatepostes();
    });
  }



  updateTotalPagespostes() {
    this.totalPagespostes = Math.ceil(this.postes.length / this.itemsPerPagepostes);
  }

  paginatepostes(): void {
    const startIndex = (this.currentPagepostes - 1) * this.itemsPerPagepostes;
    const endIndex = startIndex + this.itemsPerPagepostes;
    this.paginatedpostes = this.postes.slice(startIndex, endIndex);
  }

  goToPagepostes(page: number): void {
    if (page >= 1 && page <= this.totalPagespostes) {
      this.currentPagepostes = page;
      this.paginatepostes();
    }
  }

  previousPagepostes(): void {
    if (this.currentPagepostes > 1) {
      this.currentPagepostes--;
      this.paginatepostes();
    }
  }

  nextPagepostes(): void {
    if (this.currentPagepostes < this.totalPagespostes) {
      this.currentPagepostes++;
      this.paginatepostes();
    }
  }

  getPagespostes(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPagespostes; i++) {
      pages.push(i);
    }
    return pages;
  }

  changeItemsPerPagepostes(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const items = Number(target.value);
    this.itemsPerPagepostes = items;
    this.currentPagepostes = 1; // Reset to the first page
    this.updateTotalPagespostes();
    this.paginatepostes();
  }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }

  private getpostesByJuridictionPosteId(posteId: number): number {
    return this.postes.filter(poste => poste.consulat?.poste?.id === posteId).length;
  }

}
