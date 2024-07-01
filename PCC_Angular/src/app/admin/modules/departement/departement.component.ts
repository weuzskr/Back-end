import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { DepartementService } from 'src/app/services/departement.service';
import { JuridictionService } from 'src/app/services/juridiction.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrl: './departement.component.css'
})
export class DepartemntComponent implements OnInit, OnDestroy {
  departements: any[] = [];
  private root!: am5.Root;

  juridictions: any[] = [];
  searchTextdepartement = "";
  paginateddepartements: any[] = [];
  itemsPerPagedepartements: number = 5;
  currentPagedepartements: number = 1;
  totalPagesdepartements: number = 0;

  constructor(
    private zone: NgZone,
    private juridictionService: JuridictionService,
    private departementService: DepartementService
  ) { }

  ngOnInit(): void {
    this.juridictionService.getJuridictions().subscribe((juridictions: any[]) => {
      this.juridictions = juridictions;
    });

    this.departementService.getDepartements().subscribe((departements: any[]) => {
      this.departements = departements;
      this.updateTotalPagesdepartements();
      this.paginatedepartements();
      this.setupChart();
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
      "France": "FR",
      "Chine": "CN"
    };

    this.zone.runOutsideAngular(() => {
      const root: am5.Root = am5.Root.new("departementChartDiv");
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
          // console.log(item.nom, countryCode, countryNames);

          return {
            id: countryCode || "",
            name: item.nom,
            value: this.getdepartementsByJuridictionPosteId(item.poste.id)
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

  private getdepartementsByJuridictionPosteId(posteId: number): number {
    return this.departements.filter(departement => departement.region?.consulat?.poste?.id === posteId).length;
  }

}
