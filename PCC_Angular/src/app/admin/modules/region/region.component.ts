import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { RegionService } from 'src/app/services/region.service';
import { JuridictionService } from 'src/app/services/juridiction.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrl: './region.component.css'
})
export class RegionComponent implements OnInit, OnDestroy {
  regions: any[] = [];
  private root!: am5.Root;

  juridictions: any[] = [];
  searchTextRegion = "";
  paginatedRegions: any[] = [];
  itemsPerPageRegions: number = 5;
  currentPageRegions: number = 1;
  totalPagesRegions: number = 0;

  constructor(
    private zone: NgZone,
    private juridictionService: JuridictionService,
    private regionService: RegionService
  ) { }

  ngOnInit(): void {
    this.juridictionService.getJuridictions().subscribe((juridictions: any[]) => {
      this.juridictions = juridictions;
    });

    this.regionService.getRegions().subscribe((regions: any[]) => {
      this.regions = regions;
      this.updateTotalPagesRegions();
      this.paginateRegions();
      this.setupChart();
    });
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
      const root: am5.Root = am5.Root.new("regionChartDiv");
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
            value: this.getRegionsByJuridictionPosteId(item.poste.id)
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

  private getRegionsByJuridictionPosteId(posteId: number): number {
    return this.regions.filter(region => region.consulat?.poste?.id === posteId).length;
  }

}
