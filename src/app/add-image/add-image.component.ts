import { Component, OnInit } from '@angular/core';
import { EstateDocumentType } from '../models/document-type.model';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  fileCategory : string = "image";

  selectedDocType: EstateDocumentType = {id: "10", description: "dummy", helpText: "dummys"}
  constructor() { }

  ngOnInit(): void {
  }

}
