import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChancelierComponent } from './chancelier.component';

describe('ChancelierComponent', () => {
  let component: ChancelierComponent;
  let fixture: ComponentFixture<ChancelierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChancelierComponent]
    });
    fixture = TestBed.createComponent(ChancelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
