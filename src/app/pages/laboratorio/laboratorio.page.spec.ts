import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaboratorioPage } from './laboratorio.page';

describe('LaboratorioPage', () => {
  let component: LaboratorioPage;
  let fixture: ComponentFixture<LaboratorioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
