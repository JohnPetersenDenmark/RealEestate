import { Component, OnInit } from '@angular/core';
import { Estate } from '../models/Estate.model';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.css']
})
export class DownloadFileComponent implements OnInit {

  constructor() { }

  currentEstate = new Estate;

  ngOnInit(): void {
    
  }

}
