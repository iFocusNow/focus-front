import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsTableComponent } from './apps-table.component';

describe('AppsTableComponent', () => {
  let component: AppsTableComponent;
  let fixture: ComponentFixture<AppsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
