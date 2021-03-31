import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss']
})
export class SlidersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  minValue: number = 1;
  maxValue: number = 8;
  options: Options = {
    floor: 1,
    ceil: 8,
    step: 1,
    showTicks: true
  };

}
