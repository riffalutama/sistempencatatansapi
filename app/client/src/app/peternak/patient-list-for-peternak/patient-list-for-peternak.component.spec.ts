import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListForpeternakComponent } from './patient-list-for-peternak.component';

describe('PatientListForpeternakComponent', () => {
  let component: PatientListForpeternakComponent;
  let fixture: ComponentFixture<PatientListForpeternakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientListForpeternakComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientListForpeternakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
