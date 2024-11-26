import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalidadPage } from './calidad.page';

describe('CalidadPage', () => {
  let component: CalidadPage;
  let fixture: ComponentFixture<CalidadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
