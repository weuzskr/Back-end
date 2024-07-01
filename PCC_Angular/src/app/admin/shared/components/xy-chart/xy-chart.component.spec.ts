import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XYChartComponent } from './xy-chart.component';

describe('MapChartComponent', () => {
  let component: XYChartComponent;
  let fixture: ComponentFixture<XYChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XYChartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(XYChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
