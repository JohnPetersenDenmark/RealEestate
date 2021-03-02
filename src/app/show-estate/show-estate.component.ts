import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DownloadFileService } from '../download-file.service';
import { EstateService } from '../estate.service';

@Component({
  selector: 'app-show-estate',
  templateUrl: './show-estate.component.html',
  styleUrls: ['./show-estate.component.css']
})
export class ShowEstateComponent implements OnInit {

  constructor(private downloadFileService: DownloadFileService, private estateService: EstateService, private router: Router) { }

  selectedEstate: any;

  downloadFiles: any[] = [];
  downloadImages: any[] = [];

  ngOnInit(): void {
    this.selectedEstate = this.estateService.selectedEstate;

    this.downloadFileService.getEstateUploadedFiles(this.selectedEstate).subscribe((x: any[]) => {
      this.downloadFiles = x;
      this.downloadImages = x;
    });
  }

  
}
