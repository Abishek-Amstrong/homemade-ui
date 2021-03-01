import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsPlantersComponent } from './plants-planters.component';

describe('PlantsPlantersComponent', () => {
  let component: PlantsPlantersComponent;
  let fixture: ComponentFixture<PlantsPlantersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantsPlantersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantsPlantersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
