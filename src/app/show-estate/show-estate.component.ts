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

    console.log("sow estate estate id" + this.selectedEstate.Id)

    this.downloadFileService.getEstateUploadedFiles(this.selectedEstate).subscribe((x: any[]) => {
      
      x.forEach(downLoadedFile => {
        if (downLoadedFile.fileCategory == "image")
        {
          this.downloadImages.push(downLoadedFile);
        }
        else{
          this.downloadFiles.push(downLoadedFile);
        }

      });
          

      console.log("antal downloadede images " + this.downloadImages.length)
    });
  }


}
