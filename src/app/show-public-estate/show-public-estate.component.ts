import { Component, OnInit } from '@angular/core';
import { DownloadFileService } from '../download-file.service';
import { EstateService } from '../estate.service';

@Component({
  selector: 'app-show-public-estate',
  templateUrl: './show-public-estate.component.html',
  styleUrls: ['./show-public-estate.component.css']
})
export class ShowPublicEstateComponent implements OnInit {

  selectedEstate: any;

  downloadImages: any[] = [];

  constructor(private downloadFileService: DownloadFileService, private estateService: EstateService) { }

  ngOnInit(): void {
    this.selectedEstate = this.estateService.selectedEstate;

    console.log("sow estate estate id" + this.selectedEstate.Id)

    this.downloadFileService.getEstateUploadedFiles(this.selectedEstate).subscribe((x: any[]) => {
      
      x.forEach(downLoadedFile => {
        this.downloadImages.push(downLoadedFile); 
      });
          

      console.log("antal downloadede images " + this.downloadImages.length)
    });
  }

}
