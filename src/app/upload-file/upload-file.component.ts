import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, Input} from '@angular/core';
import { EstateDocumentType } from '../models/document-type.model';
import { Estate } from '../models/Estate.model';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {


  @ViewChild("fileDropRef", { static: false })
  fileDropEl!: ElementRef;

  @Input() selectedDocType: EstateDocumentType = new (EstateDocumentType);

  constructor(private httpClient: HttpClient, private uploadService: UploadFileService) { }

 
  files: any[] = [];

  ngOnInit(): void {
   
  }

  UploadFilesToServer() {
    let index = 0;
    this.files.forEach(element => {
      console.log("dette er et fileobject" + element)
      let file = <File>element;
      console.log(file)
      const formData = new FormData();
      formData.append(file.type, file, file.name);
      formData.append("DocumentTypeId", this.selectedDocType.id);
      formData.append("EstateId", "7000");
      formData.append("profileId", "6150");
      console.log(formData);
      this.dummyHelperFunction(index, formData)
      index = index + 1;
    });

  }


  dummyHelperFunction(localIndex: number, localFormDate: FormData): void {
    this.httpClient.post("https://localhost:44303/api/Upload/uploadFile", localFormDate, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(res => {
        if (res.type === HttpEventType.UploadProgress) {
          if (res.total != undefined) {
            const percentDone = Math.round(100 * res.loaded / res.total);
            this.files[localIndex].progress = percentDone;
            console.log('Progress ' + percentDone + '%');
          }
        }

        console.log("we uploaded a file" + res);
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
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
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
