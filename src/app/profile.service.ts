import { Injectable } from '@angular/core';
import { CreateProfile } from './models/create-profile.model';
import { Profile } from './models/profile.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './models/login.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  currentProfile: Profile = new Profile();

  save(profile: CreateProfile): Observable<CreateProfile> {
    return this.httpClient.post<CreateProfile>("https://localhost:44303/api/Profiles", profile, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }

  saveEditedProfile(profile: Profile): Observable<Profile> {
    {
      return this.httpClient.post<Profile>("https://localhost:44303/api/Profiles/saveEditedProfile", profile, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
    }
  }


  getMyProfile(): Observable<any> {
    return this.httpClient.get<any>("https://localhost:44303/api/Profiles/GetMyProfile")
  }

  login(login: Login): Observable<string> {
    return this.httpClient.post<string>("https://localhost:44303/api/Profiles/Login", login, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }
}
