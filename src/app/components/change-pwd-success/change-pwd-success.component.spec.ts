import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePwdSuccessComponent } from './change-pwd-success.component';

describe('ChangePwdSuccessComponent', () => {
  let component: ChangePwdSuccessComponent;
  let fixture: ComponentFixture<ChangePwdSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePwdSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePwdSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
