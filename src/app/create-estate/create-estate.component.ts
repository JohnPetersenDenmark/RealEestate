import { Component, OnInit } from '@angular/core';
import { Estate } from '../models/Estate.model';

@Component({
  selector: 'app-create-estate',
  templateUrl: './create-estate.component.html',
  styleUrls: ['./create-estate.component.css']
})
export class CreateEstateComponent implements OnInit {

  estate: Estate = new Estate();
  constructor() { }

  ngOnInit(): void {
  }

  saveEstate(): void {
   }
}
