import { OverviewComponent } from './../overview/overview.component';
import { Router } from '@angular/router';
import { CitoyenService } from './../../../../services/citoyen.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChancelierComponent } from 'src/app/admin/modules/chancelier/chancelier.component';
import { MinistreComponent } from 'src/app/admin/modules/ministre/ministre.component';
import { AuthService } from 'src/app/services/auth.service';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  SearchText = "";
  citoyens: any[] = [];
  paginatedCitoyens: any[] = [];
  itemsPerPage: number = 5; // Par défaut, 5 éléments par page
  currentPage: number = 1;
  totalPages: number = 0;
  @ViewChild(MinistreComponent) ministre!: MinistreComponent;
  @ViewChild(ChancelierComponent) chancelier!: ChancelierComponent;
  consulat_id: number = 0;
  user: any;
  @ViewChild(OverviewComponent) overview!: OverviewComponent;

  constructor(private CitoyenService: CitoyenService, private router: Router, private AuthService: AuthService) { }

  ngOnInit() {
    if (this.getType() == "ministre") {
      this.loadCitoyens();
    } else if (this.getType() == "chancelier") {
      this.loardcitoyenbychancelier();
    }
  }
  getType(): string {
    return this.AuthService.gettype();
  }
  loadCitoyens() {
    this.CitoyenService.getAllcitoyens().subscribe(
      (response) => {
        response.forEach((citoyen: any) => {
          if (citoyen.dateDeNaissance) {
            citoyen.dateDeNaissance = format(new Date(citoyen.dateDeNaissance), 'dd MMMM yyyy', { locale: fr });
          }
        });
        this.citoyens = response;
        this.updateTotalPages();
        this.paginateCitoyens();
      },
      (error) => {
      }
    );
  }
  get_id() {
    if (localStorage.getItem("userConnect")) {
      this.user = JSON.parse(localStorage.getItem("userConnect") || "");
      this.consulat_id = this.user.user.consulatId;

    }
  }
  loardcitoyenbychancelier() {
    this.get_id()
    this.CitoyenService.getCitoyensByChancelier(this.consulat_id).subscribe(
      (data) => {
        data.forEach((citoyen: any) => {
          if (citoyen.dateDeNaissance) {
            citoyen.dateDeNaissance = format(new Date(citoyen.dateDeNaissance), 'dd MMMM yyyy', { locale: fr });
          }
        });
        this.citoyens = data;
        this.updateTotalPages();
        this.paginateCitoyens();
      },
      (error) => {
      }
    );
  }



  updateTotalPages() {
    this.totalPages = Math.ceil(this.citoyens.length / this.itemsPerPage);
  }

  paginateCitoyens(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCitoyens = this.citoyens.slice(startIndex, endIndex);
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

  changeItemsPerPage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const items = Number(target.value);
    this.itemsPerPage = items;
    this.currentPage = 1; // Réinitialise à la première page
    this.updateTotalPages();
    this.paginateCitoyens();
  }
  showcitoyen(id: number) {
    this.CitoyenService.setcitoyen_id(id);
    this.overview.loadCitoyen();
  }

  get_citoyen_id() {
    return this.CitoyenService.getcitoyen_id();
  }



}
