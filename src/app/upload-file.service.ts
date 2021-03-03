import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstateDocumentType } from './models/document-type.model';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private httpClient: HttpClient) { }

  getDocumentTypes(): Observable<EstateDocumentType[]> {
    return this.httpClient.get<EstateDocumentType[]>("https://localhost:44303/api/DownloadFile/documentTypes")
  }
}
