import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from './models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class CheckIfLoggedInService {

  constructor(private httpClient: HttpClient) { }

  userIsLoggedin: boolean = false;

  IsLoggedInAA(): Observable<any>
  {
    return this.httpClient.post<Profile>("https://localhost:44303/api/Profiles/isuserloggedin",{
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  } 
}
