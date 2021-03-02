import { Component, Input, OnInit } from '@angular/core';
import { DownloadFileService } from '../download-file.service';


@Component({
  selector: 'app-show-file',
  templateUrl: './show-file.component.html',
  styleUrls: ['./show-file.component.css']
})
export class ShowFileComponent implements OnInit {

  @Input() downloadFiles : any[] = [];

  constructor(private  downloadFileService:  DownloadFileService) { }

  ngOnInit(): void {
  }

  fileDoSomeThing(event: Event) : void {

  }

  downLoadDocument(index: number) : void {

    // this.downloadFileService.downLoadFileById(this.downloadFiles[index].id).subscribe(x => {
    //   console.log ( x);
    // });
  
    window.location.href='https://localhost:44303/api/DownloadFile/downLoadFile?fileId=' + this.downloadFiles[index].id;
    console.log ( "index of selected file " + index)
  }

  viewDocument(index: number) : void { 
    let fileId: number = this.downloadFiles[index].id;
    let fileIdStr = fileId.toString();
    window.location.href='https://localhost:44303/api/DownloadFile/showFile?fileId=' + fileIdStr;
    console.log ( "id of file " + this.downloadFiles[index].id)
  }
  

}
