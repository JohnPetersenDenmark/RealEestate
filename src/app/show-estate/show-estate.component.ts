import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstateService } from '../estate.service';

@Component({
  selector: 'app-show-estate',
  templateUrl: './show-estate.component.html',
  styleUrls: ['./show-estate.component.css']
})
export class ShowEstateComponent implements OnInit {

  constructor(private estateService: EstateService, private router: Router) { }

selectedEstate: any ;


  ngOnInit(): void {
   this.selectedEstate = this.estateService.selectedEstate;
  }

}
