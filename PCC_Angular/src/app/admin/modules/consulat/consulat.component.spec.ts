import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsulatComponent } from './consulat.component';

describe('ConsulatComponent', () => {
  let component: ConsulatComponent;
  let fixture: ComponentFixture<ConsulatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsulatComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConsulatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
