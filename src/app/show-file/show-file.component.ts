import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DownloadFileService } from '../download-file.service';


@Component({
  selector: 'app-show-file',
  templateUrl: './show-file.component.html',
  styleUrls: ['./show-file.component.css']
})
export class ShowFileComponent implements OnInit {

  selectedId: string = "";
  @Input() downloadFiles: any[] = [];

  constructor(private downloadFileService: DownloadFileService, private router: Router) { }

  ngOnInit(): void {
  }

  showMenu(index: number): void {
    console.log("index of selected div " + index)
    this.selectedId = this.downloadFiles[index].id
  }

  downLoadDocument(index: number): void {
    window.location.href = 'https://localhost:44303/api/DownloadFile/downLoadFile?fileId=' + this.downloadFiles[index].id;
    console.log("index of selected file " + index)
  }
 
  viewDocument(index: number): void {
    let fileId: number = this.downloadFiles[index].id;
    let fileIdStr = fileId.toString();
    window.location.href = 'https://localhost:44303/api/DownloadFile/showFile?fileId=' + fileIdStr;
    console.log("id of file " + this.downloadFiles[index].id)
  }

  deleteDocument(index: number): void {
    window.location.href = 'https://localhost:44303/api/DownloadFile/deleteFile?fileId=' + this.downloadFiles[index].id;
    console.log("index of selected file " + index)
  }

  addDocument(): void {
    this.router.navigate(["add-file"]);
  }

}
