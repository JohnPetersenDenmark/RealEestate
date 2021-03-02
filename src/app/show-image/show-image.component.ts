import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {

  @Input() downloadImages : any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  imageDoSomeThing(event: Event) : void {

  }
}
