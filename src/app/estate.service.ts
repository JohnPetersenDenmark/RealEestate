import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Estate } from './models/Estate.model';
import { Profile } from './models/profile.model';
import { PageResult } from './models/PageResult';

@Injectable({
  providedIn: 'root'
})
export class EstateService {

  public selectedEstate: any;

  constructor(private httpClient: HttpClient) { }

  getEstateList(): Observable<any[]> {
    return this.httpClient.get<any[]>("https://localhost:44303/api/Estates")
  }

  getPagedEstateList(pageSize : number, pageNumber : number): Observable<PageResult<any[]>> {
    return this.httpClient.get<PageResult<any[]>>("https://localhost:44303/api/Estates?page=" + pageNumber + "&pageSize=" + pageSize)
  }

  getEstateByProfile(profile: Profile): Observable<any[]> {
    return this.httpClient.get<any[]>("https://localhost:44303/api/Estates/GetEstateByProfileId?profileId=" + profile.id)
  }

  saveEstate(estate: Estate): Observable<Estate> {
    {
      return this.httpClient.post<Estate>("https://localhost:44303/api/Estates", estate, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
    }
  }

  updateEstate(estate: Estate): Observable<Estate> {
    {
      return this.httpClient.put<Estate>("https://localhost:44303/api/Estates", estate, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
    }
  }

  estateModelMappingForGet(backEndEstate: any): Estate {
    let frontEndEstate: Estate  = new Estate;
    
    frontEndEstate.Id = backEndEstate.id;
    frontEndEstate.Address1 = backEndEstate.address1;
    frontEndEstate.Address2 = backEndEstate.address2;
    frontEndEstate.Zip = backEndEstate.zip;
    frontEndEstate.City = backEndEstate.city;
    frontEndEstate.Price = backEndEstate.price;

    frontEndEstate.EstateType = backEndEstate.estateType;
    frontEndEstate.Areal = backEndEstate.areal;
    frontEndEstate.VaegtetAreal = backEndEstate.vaegtetAreal;
    frontEndEstate.GrundAreal = backEndEstate.grundAreal;
    frontEndEstate.EjerudgiftPrMd = backEndEstate.ejerudgiftPrMd;
    frontEndEstate.PrisPrM2 = backEndEstate.prisPrM2;
    frontEndEstate.Liggetid = backEndEstate.liggetid;
    frontEndEstate.NoOfRooms = backEndEstate.noOfRooms;
    frontEndEstate.BuildedYear = backEndEstate.buildedYear;
    frontEndEstate.RegistrationNumber = backEndEstate.registrationNumber;
    frontEndEstate.BuyerIdentityUserIds = backEndEstate.buyerIdentityUserIds;
    frontEndEstate.OwnerIdentityUserIds = backEndEstate.ownerIdentityUserIds;
    frontEndEstate.CreatedDate = backEndEstate.CreatedDate;
    frontEndEstate.ModifiedDate = backEndEstate.ModifiedDate;

    return frontEndEstate;
  }


}
