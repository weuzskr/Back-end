import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistreComponent } from './ministre.component';

describe('MinistreComponent', () => {
  let component: MinistreComponent;
  let fixture: ComponentFixture<MinistreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinistreComponent]
    });
    fixture = TestBed.createComponent(MinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
