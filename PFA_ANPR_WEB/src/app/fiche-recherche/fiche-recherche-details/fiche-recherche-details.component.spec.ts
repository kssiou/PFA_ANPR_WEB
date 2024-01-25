import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheRechercheDetailsComponent } from './fiche-recherche-details.component';

describe('FicheRechercheDetailsComponent', () => {
  let component: FicheRechercheDetailsComponent;
  let fixture: ComponentFixture<FicheRechercheDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FicheRechercheDetailsComponent]
    });
    fixture = TestBed.createComponent(FicheRechercheDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
