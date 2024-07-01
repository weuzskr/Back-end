import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { JuridictionService } from 'src/app/services/juridiction.service';
import { CitoyenService } from 'src/app/services/citoyen.service';
import { ConsulatService } from 'src/app/services/consulat.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-xy-chart',
  templateUrl: './xy-chart.component.html',
  styleUrls: ['./xy-chart.component.css']
})
export class XYChartComponent implements OnInit, OnDestroy {
  citoyens: any[] = [];
  consulats: any[] = [];
  juridictions: any[] = [];

  private root!: am5.Root;

  constructor(
    private zone: NgZone,
    private citoyenService: CitoyenService,
    private consulatService: ConsulatService,
    private juridictionService: JuridictionService
  ) { }

  ngOnInit(): void {
    forkJoin([
      this.citoyenService.getAllcitoyens(),
      this.consulatService.getConsulats(),
      this.juridictionService.getJuridictions()
    ]).subscribe(([citoyens, consulats, juridictions]) => {
      this.citoyens = citoyens;
      this.consulats = consulats;
      this.juridictions = juridictions;
      this.createChart(); // Créez le graphique après le chargement des données
    });
  }

  private createChart(): void {
    this.zone.runOutsideAngular(() => {
      let root = am5.Root.new("xychartdiv");

      // Set themes
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        layout: root.verticalLayout
      }));

      // Data
      let colors = chart.get("colors");

      const transformData = (data: any[]): { country: string, visits: number, columnSettings: any }[] => {

        return data.map(item => ({
          country: item.nom,
          visits: this.getCitoyensByPosteId(item.poste.id),
          columnSettings: { fill: colors?.next() },
          // icon: countryNames.length > 1 ? "https://www.amcharts.com/wp-content/uploads/flags/fr.svg" : countryNames[0].toLowerCase().replace(" ", "_").concat(".svg")
        }));
      };

      const transformedData = transformData(this.juridictions);

      // Create axes
      let xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 70,
        minorGridEnabled: true
      });

      let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "country",
        renderer: xRenderer,
        bullet: function (root, axis, dataItem: any) {
          return am5xy.AxisBullet.new(root, {
            location: 0.5,
            sprite: am5.Picture.new(root, {
              width: 24,
              height: 24,
              centerY: am5.p50,
              centerX: am5.p50,
              src: dataItem.dataContext.icon
            })
          });
        }
      }));

      xRenderer.grid.template.setAll({ location: 1 });
      xRenderer.labels.template.setAll({ paddingTop: 20 });

      xAxis.data.setAll(transformedData);

      let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 })
      }));

      // Add series
      let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "visits",
        categoryXField: "country"
      }));

      series.columns.template.setAll({
        tooltipText: "{categoryX}: {valueY}",
        tooltipY: 0,
        strokeOpacity: 0,
        templateField: "columnSettings"
      });

      series.data.setAll(transformedData);

      // Make stuff animate on load
      series.appear();
      chart.appear(1000, 100);

      this.root = root;
    });
  }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }

  private getCitoyensByPosteId(posteId: number): number {
    return this.citoyens.filter(citoyen => citoyen.consulat.poste.id === posteId).length;
  }
}
