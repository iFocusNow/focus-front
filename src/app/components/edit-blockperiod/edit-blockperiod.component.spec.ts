import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBlockperiodComponent } from './edit-blockperiod.component';

describe('EditBlockperiodComponent', () => {
  let component: EditBlockperiodComponent;
  let fixture: ComponentFixture<EditBlockperiodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBlockperiodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBlockperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
