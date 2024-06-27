import { Router } from '@angular/router';
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
  itemsPerPage: number = 5; // Par défaut, 5 éléments par page
  currentPage: number = 1;
  totalPages: number = 0;
  @ViewChild(MinistreComponent) ministre!: MinistreComponent;
  @ViewChild(ChancelierComponent) chancelier!: ChancelierComponent;
  consulat_id: number = 0;
  user: any;
  citoyen_id: number = 0;
  citoyen: any = {};


  constructor(private CitoyenService: CitoyenService, private router: Router) { }

  ngOnInit() {
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
        this.updateTotalPages();
        this.paginateCitoyens();
      },
      (error) => {
        console.error('Erreur lors de la récupération des citoyens pour le ministre :', error);
      }
    );
  }
  get_id() {
    if (localStorage.getItem("userConnect")) {
      this.user = JSON.parse(localStorage.getItem("userConnect") || "");
      this.consulat_id = this.user.user.consulatId;
      // console.log(this.consulat_id);
      // console.log("L'utilisateur connecté est :", this.user.user);

    }
  }
  loardcitoyenbychancelier() {
    this.get_id()
    this.CitoyenService.getCitoyensByChancelier(this.consulat_id).subscribe(
      (data) => {
        this.citoyens = data;
        this.updateTotalPages();
        this.paginateCitoyens();
      },
      (error) => {
        console.error('Erreur lors de la récupération des citoyens pour le chancelier :', error);
      }
    );
  }

  loardcitoyenbyID(citoyen_id: number) {


    this.CitoyenService.getCitoyensById(citoyen_id).subscribe(
      (data) => {
        this.citoyen = data;
        console.log(this.citoyen);
      },
      (error) => {
        console.error('Erreur lors de la récupération des citoyens pour le ID :', error);
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
    this.citoyen_id = id;
    this.loardcitoyenbyID(id)
  }

}
