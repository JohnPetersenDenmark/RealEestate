import { Component, OnInit } from '@angular/core';
import { EstateDocumentType } from '../models/document-type.model';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  selectedDocType: EstateDocumentType = {id: "10", description: "dummy", helpText: "dummy"}
  constructor() { }

  ngOnInit(): void {
  }

}
