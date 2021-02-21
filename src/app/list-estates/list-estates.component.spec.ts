import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEstatesComponent } from './list-estates.component';

describe('ListEstatesComponent', () => {
  let component: ListEstatesComponent;
  let fixture: ComponentFixture<ListEstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEstatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
