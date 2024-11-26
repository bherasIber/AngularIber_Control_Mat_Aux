import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisenoPage } from './diseno.page';

describe('DisenoPage', () => {
  let component: DisenoPage;
  let fixture: ComponentFixture<DisenoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DisenoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
