import { ComponentFixture, TestBed } from '@angular/core/testing';

import { peternakRegisterComponent } from './peternak-register.component';

describe('peternakNewComponent', () => {
  let component: peternakRegisterComponent;
  let fixture: ComponentFixture<peternakRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ peternakRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(peternakRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
