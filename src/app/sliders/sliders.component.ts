import { Component, Input, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss']
})
export class SlidersComponent implements OnInit {

  @Input()  value: number = 1;
  @Input()  minValue: number = 1;
  @Input()  maxValue: number = 8;
  @Input()  options: Options = {
    
  };

  constructor() { }

  ngOnInit(): void {
  }

 
 

}
