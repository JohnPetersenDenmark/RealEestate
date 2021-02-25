import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Estate } from '../models/Estate.model';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {


  @ViewChild("fileDropRef", { static: false })
  fileDropEl!: ElementRef;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

  }

  files: any[] = [];


  UploadFilesToServer() {
   

    this.files.forEach(element => {
      let file = <File>element;
      console.log(file)
      const formData = new FormData();
      formData.append(file.type, file, file.name);     
      console.log(formData);
      this.httpClient.post("https://localhost:44303/api/Estates/uploadFile", formData , )
        .subscribe(res => {
          console.log(res);
        });
    });

  }

  /**
   * on file drop handler
   */
  onFileDropped($event: any[]) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(e: Event) {

    const element = e.currentTarget as HTMLInputElement;
    let fileList: any | null = element.files;
    //console.log(files[0])
    this.prepareFilesList(fileList);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: number, decimals: number) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}