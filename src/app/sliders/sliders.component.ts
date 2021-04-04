import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, DoCheck, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';


@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss']
})
export class SlidersComponent implements OnInit {


  @Input() set estateValue(val: number) {
    console.log("estateValue in slider" + val)
    this.lowValue = val;
  };
  get estateValue(): number {
    return this.lowValue
  }

  @Input() set estateOptions(options: Options) {
    this.options = options;
  }

  get estateOptions() : Options {
    return  this.options ;
  }


 
  @Input() set estateMaxValue(val: number) {
    this.highValue = val;
  }

  get estateMaxValue() : number {
    return  this.highValue ;
  }



  @Output() estateValueChange = new EventEmitter<number>();
  @Output() estateMaxValueChange = new EventEmitter<number>();

  private _lowValue!: number;

  get lowValue(): number {
    return this._lowValue
  }

  set lowValue(val: number) {
    console.log("lowValue changed: " + val);
    this._lowValue = val;
    this.estateValueChange.emit(val);

  }

  private _highValue!: number;

  get highValue(): number {
    return this._highValue
  }

  set highValue(val: number) {
    console.log("highValue changed: " + val);
    this._highValue = val;
    this.estateMaxValueChange.emit(val);

  }


  options!: Options;


  constructor() {

  }

  ngOnInit(): void {

    this.lowValue = this.estateValue;
    this.highValue = this.estateMaxValue;
    this.options = this.estateOptions;
  }

}
