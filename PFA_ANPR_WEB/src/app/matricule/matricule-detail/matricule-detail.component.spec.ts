import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculeDetailComponent } from './matricule-detail.component';

describe('MatriculeDetailComponent', () => {
  let component: MatriculeDetailComponent;
  let fixture: ComponentFixture<MatriculeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatriculeDetailComponent]
    });
    fixture = TestBed.createComponent(MatriculeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
