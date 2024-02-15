import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheRechercheCreateComponent } from './fiche-recherche-create.component';

describe('FicheRechercheCreateComponent', () => {
  let component: FicheRechercheCreateComponent;
  let fixture: ComponentFixture<FicheRechercheCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FicheRechercheCreateComponent]
    });
    fixture = TestBed.createComponent(FicheRechercheCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
