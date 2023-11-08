import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProjectComponent } from './gestion-project.component';

describe('GestionProjectComponent', () => {
  let component: GestionProjectComponent;
  let fixture: ComponentFixture<GestionProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionProjectComponent]
    });
    fixture = TestBed.createComponent(GestionProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
