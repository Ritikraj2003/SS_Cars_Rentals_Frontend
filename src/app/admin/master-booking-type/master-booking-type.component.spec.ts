import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterBookingTypeComponent } from './master-booking-type.component';

describe('MasterBookingTypeComponent', () => {
  let component: MasterBookingTypeComponent;
  let fixture: ComponentFixture<MasterBookingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterBookingTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterBookingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
