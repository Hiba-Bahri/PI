import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotekComponent } from './cotek.component';

describe('CotekComponent', () => {
  let component: CotekComponent;
  let fixture: ComponentFixture<CotekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CotekComponent]
    });
    fixture = TestBed.createComponent(CotekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
