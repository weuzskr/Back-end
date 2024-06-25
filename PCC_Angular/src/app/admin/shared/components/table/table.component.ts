
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  SearchText = "";
  @Input() citoyens: any[] = [];
  @Input() showConsulat: any;


}
