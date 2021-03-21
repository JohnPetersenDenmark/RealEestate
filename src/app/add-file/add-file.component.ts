import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EstateDocumentType } from '../models/document-type.model';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent implements OnInit {

  docTypes: EstateDocumentType[] = [];
  selectedDocType: EstateDocumentType = new EstateDocumentType;

  fileCategory : string = "document";

  constructor(private httpClient: HttpClient, private uploadService: UploadFileService) { }

  ngOnInit(): void {
    this.uploadService.getDocumentTypes().subscribe(res => {
      this.docTypes = res;
    })
  }

  showSelected() : void {
    console.log("selected id:" + this.selectedDocType.id );

    let tmpVar = this.docTypes.find(x => x.id == this.selectedDocType.id);
    if (tmpVar != undefined)
    {
      this.selectedDocType = tmpVar;
    }
  
  }

}
