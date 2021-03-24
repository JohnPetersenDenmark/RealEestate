import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPublicEstateComponent } from './show-public-estate.component';

describe('ShowPublicEstateComponent', () => {
  let component: ShowPublicEstateComponent;
  let fixture: ComponentFixture<ShowPublicEstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPublicEstateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPublicEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
