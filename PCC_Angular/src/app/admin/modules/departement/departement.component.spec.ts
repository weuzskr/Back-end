import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartemntComponent } from './departement.component';

describe('DepartemntComponent', () => {
  let component: DepartemntComponent;
  let fixture: ComponentFixture<DepartemntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartemntComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DepartemntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
