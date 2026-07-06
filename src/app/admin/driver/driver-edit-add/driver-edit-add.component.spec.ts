import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverEditAddComponent } from './driver-edit-add.component';

describe('DriverEditAddComponent', () => {
  let component: DriverEditAddComponent;
  let fixture: ComponentFixture<DriverEditAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverEditAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverEditAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
