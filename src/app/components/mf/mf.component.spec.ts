import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfComponent } from './mf.component';

describe('MfComponent', () => {
  let component: MfComponent;
  let fixture: ComponentFixture<MfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
