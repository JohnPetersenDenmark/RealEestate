import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateImgageCarouselComponent } from './estate-imgage-carousel.component';

describe('EstateImgageCarouselComponent', () => {
  let component: EstateImgageCarouselComponent;
  let fixture: ComponentFixture<EstateImgageCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstateImgageCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateImgageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
