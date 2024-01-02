import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProjectDetailsComponent } from './client-project-details.component';

describe('ClientProjectDetailsComponent', () => {
  let component: ClientProjectDetailsComponent;
  let fixture: ComponentFixture<ClientProjectDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientProjectDetailsComponent]
    });
    fixture = TestBed.createComponent(ClientProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
