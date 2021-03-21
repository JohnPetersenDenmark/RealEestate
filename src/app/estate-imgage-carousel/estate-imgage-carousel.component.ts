import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-estate-imgage-carousel',
  templateUrl: './estate-imgage-carousel.component.html',
  styleUrls: ['./estate-imgage-carousel.component.css']
})
export class EstateImgageCarouselComponent implements OnInit {

  @Input() downloadImages: any[] = [];

  @ViewChild('ngcarousel', { static: true })
  ngCarousel!: NgbCarousel;

  constructor() { }
 
 public images = [

    'https://localhost:44303/app-images/0fb12c7f-dc6b-49bf-888d-dcbf44e151aa_Cookie-edit-menu-not-logged-in.PNG', 
   
    'https://localhost:44303/app-images/30dede35-ae7f-4833-aa06-3473d8e92fbd_Cookie-change-form.PNG',
   
    'https://localhost:44303/app-images/b134fcf3-c817-496a-8575-a597b5b4d94a_Cookie-change-form.PNG'
   
    ];

  ngOnInit(): void {
  }

 // Move to specific slide
 navigateToSlide(item: string) {
  this.ngCarousel.select(item);
  console.log(item)
}

// Move to previous slide
getToPrev() {
  this.ngCarousel.prev();
}

// Move to next slide
goToNext() {
  this.ngCarousel.next();
}

// Pause slide
stopCarousel() {
  this.ngCarousel.pause();
}

// Restart carousel
restartCarousel() {
  this.ngCarousel.cycle();
}

}
