import { JuridictionService } from 'src/app/services/juridiction.service';
import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { CitoyenService } from 'src/app/services/citoyen.service';
import { ConsulatService } from 'src/app/services/consulat.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-map-chart',
  templateUrl: './map-chart.component.html',
  styleUrls: ['./map-chart.component.css']
})
export class MapChartComponent implements OnInit, OnDestroy {
  citoyensNumber: any = [];
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
      this.setupChart(); // Créez le graphique après le chargement des données
    });
  }

  private setupChart(): void {
    const countryCodeMap: { [key: string]: string } = {
      "CÔTE D’IVOIRE": "CI",
      "EMIRATS ARABES UNIS": "AE",
      "NIGÉRIA": "NG",
      "GHANA": "GH",
      "BÉNIN": "BJ",
      "ETHIOPIE": "ET",
      "TANZANIE": "TZ",
      "SOMALIE": "SO",
      "DJIBOUTI": "DJ",
      "COMORES": "KM",
      "ALGÉRIE": "DZ",
      "TURQUIE": "TR",
      "FRANCE": "FR",
      "CHINE": "CN",
    };

    this.zone.runOutsideAngular(() => {
      const root: am5.Root = am5.Root.new("chartdiv");
      root.setThemes([am5themes_Animated.new(root)]);

      const chart: am5map.MapChart = root.container.children.push(am5map.MapChart.new(root, {}));

      const polygonSeries: am5map.MapPolygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_worldLow,
          exclude: ["AQ"]
        })
      );

      const bubbleSeries: am5map.MapPointSeries = chart.series.push(
        am5map.MapPointSeries.new(root, {
          valueField: "value",
          calculateAggregates: true,
          polygonIdField: "id"
        })
      );

      const circleTemplate: am5.Template<any> = am5.Template.new({});

      bubbleSeries.bullets.push((root, series, dataItem) => {
        const container: am5.Container = am5.Container.new(root, {});

        const circle: am5.Circle = container.children.push(
          am5.Circle.new(root, {
            radius: 20,
            fillOpacity: 0.7,
            fill: am5.color(0xff0000),
            cursorOverStyle: "pointer",
            tooltipText: `{name}: [bold]{value}[/]`
          }, circleTemplate)
        );

        const countryLabel: am5.Label = container.children.push(
          am5.Label.new(root, {
            text: "{name}",
            paddingLeft: 5,
            populateText: true,
            fontWeight: "bold",
            fontSize: 13,
            centerY: am5.p50
          })
        );

        circle.on("radius", (radius) => {
          countryLabel.set("x", radius);
        });

        return am5.Bullet.new(root, {
          sprite: container,
          dynamic: true
        });
      });

      bubbleSeries.bullets.push((root, series, dataItem) => {
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            text: "{value.formatNumber('#.')}",
            fill: am5.color(0xffffff),
            populateText: true,
            centerX: am5.p50,
            centerY: am5.p50,
            textAlign: "center"
          }),
          dynamic: true
        });
      });

      bubbleSeries.set("heatRules", [
        {
          target: circleTemplate,
          dataField: "value",
          min: 10,
          max: 50,
          minValue: 0,
          maxValue: 100000,
          key: "radius"
        }
      ]);

      const transformData = (data: any[], map: { [key: string]: string }): { id: string, name: string, value: number }[] => {
        return data.map(item => {
          const countryNames: string[] = item.nom.split(", ");
          const countryCode: string | undefined = countryNames.map(name => map[name]).find(code => !!code);
          return {
            id: countryCode || "",
            name: item.nom,
            value: this.getCitoyensByPosteId(item.poste.id)
          };
        });
      };

      const transformedData = transformData(this.juridictions, countryCodeMap);

      bubbleSeries.data.setAll(transformedData);

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
