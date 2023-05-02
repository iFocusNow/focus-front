import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppDialogComponent } from './add-app-dialog.component';

describe('AddAppDialogComponent', () => {
  let component: AddAppDialogComponent;
  let fixture: ComponentFixture<AddAppDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAppDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
