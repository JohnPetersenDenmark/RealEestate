import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estate } from './models/Estate.model';

@Injectable({
  providedIn: 'root'
})

export class DownloadFileService {
      
  constructor(private httpClient: HttpClient) { }


  getEstateUploadedFiles(currentEstate: Estate) : Observable<any[]> {
    return this.httpClient.get<any[]>("https://localhost:44303/api/DownloadFile/GetUploadedFilesByEstateId?estateId=" + currentEstate.Id)

  }

  downLoadFileById(fileId: number) : Observable<any[]> {
    let fileIdStr = fileId.toString();
    return this.httpClient.get<any[]>("https://localhost:44303/api/DownloadFile/downLoadFile?fileId=" + fileIdStr)
  }
}
