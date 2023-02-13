import { ComponentFixture, TestBed } from '@angular/core/testing';

import { peternakComponent } from './peternak.component';

describe('peternakComponent', () => {
  let component: peternakComponent;
  let fixture: ComponentFixture<peternakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ peternakComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(peternakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
