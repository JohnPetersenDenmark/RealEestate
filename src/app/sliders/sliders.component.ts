import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, DoCheck, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';


@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss']
})
export class SlidersComponent   {
 

  @Input() estateValue!: number;
  @Input() estateMaxValue!: number;
  @Input() estateOptions!: Options;

  
  @Output() estateValueChange = new EventEmitter<number>();
  @Output() estateMaxValueChange = new EventEmitter<number>();

  
  // lowValue!: number;
  // highValue!: number;
  // options!: Options;

 

  

  constructor() {
  
  }

  ngOnInit(): void {
 
    // this.lowValue = this.estateValue;
    // this.highValue = this.estateMaxValue;
    // this.options = this.estateOptions;
  }
  
 

}
