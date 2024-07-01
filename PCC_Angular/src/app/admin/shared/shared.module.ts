import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TableComponent } from './components/table/table.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { CitoyenService } from 'src/app/services/citoyen.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/search.pipe';
import { OverviewComponent } from './components/overview/overview.component';
import { MapChartComponent } from './components/map-chart/map-chart.component';
import { XYChartComponent } from './components/xy-chart/xy-chart.component';
@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    NotFoundComponent,
    TableComponent,
    StepperComponent,
    OverviewComponent,
    MapChartComponent,
    XYChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SearchPipe,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    NotFoundComponent,
    TableComponent,
    StepperComponent,
    OverviewComponent,
    MapChartComponent,
    XYChartComponent
  ],
  providers: [
    CitoyenService
  ]
})
export class SharedModule { }
