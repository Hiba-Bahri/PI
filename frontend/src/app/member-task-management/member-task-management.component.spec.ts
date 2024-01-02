import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTaskManagementComponent } from './member-task-management.component';

describe('MemberTaskManagementComponent', () => {
  let component: MemberTaskManagementComponent;
  let fixture: ComponentFixture<MemberTaskManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberTaskManagementComponent]
    });
    fixture = TestBed.createComponent(MemberTaskManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
