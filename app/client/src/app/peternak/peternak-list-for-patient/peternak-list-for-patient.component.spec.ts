import { ComponentFixture, TestBed } from '@angular/core/testing';

import { peternakListForPatientComponent } from './peternak-list-for-patient.component';

describe('peternakListForPatientComponent', () => {
  let component: peternakListForPatientComponent;
  let fixture: ComponentFixture<peternakListForPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ peternakListForPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(peternakListForPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
