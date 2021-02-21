import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Estate } from './models/Estate.model';

@Injectable({
  providedIn: 'root'
})
export class EstateService {


  constructor(private httpClient: HttpClient) { }

  getEstateList() : Observable<any[]>
  {
    return this.httpClient.get<any[]>("https://localhost:44303/api/Estates")
  }
}
