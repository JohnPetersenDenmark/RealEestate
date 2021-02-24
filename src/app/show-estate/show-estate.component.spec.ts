import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEstateComponent } from './show-estate.component';

describe('ShowEstateComponent', () => {
  let component: ShowEstateComponent;
  let fixture: ComponentFixture<ShowEstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowEstateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
