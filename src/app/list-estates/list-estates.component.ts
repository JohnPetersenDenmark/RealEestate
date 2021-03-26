import { Component, OnInit } from '@angular/core';
import { EstateService } from '../estate.service';
import { Estate } from '../models/Estate.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';


@Component({
  templateUrl: './list-estates.component.html',
  styleUrls: ['./list-estates.component.css']
})

export class ListEstatesComponent implements OnInit {

  viewModel: Estate[] = [];

  public pageSize: number = 2;
  public pageNumber: number = 1;
  public Count!: number;

  constructor(private _estateService: EstateService, private router: Router) {
   
   }
 

  ngOnInit() {
    this._estateService.getEstateList().subscribe(result => {
      this.mapEstate(result);    
      this.Count = result.length; 
    }, error => console.error(error));

    
  }

  public onPageChange = (pageNumber: any) => {
    this.pageNumber = pageNumber;
   
}
  goReadEstate(estateId: string) {

    console.log("klikket på");
    let selectedEstate = this.viewModel.find(x => x.Id === estateId);
    this._estateService.selectedEstate = selectedEstate;
    this.router.navigate(["publicestate"]);

    console.log("klikket på" + estateId);

  }

  mapEstate(estateList: any[])  {

    estateList.forEach((element: any) => {
      let estate = new Estate();
      estate.Id = element.id;
      estate.RegistrationNumber = element.registrationNumber;
      estate.BuyerIdentityUserIds = element.buyerIdentityUserIds;
      estate.OwnerIdentityUserIds = element.ownerIdentityUserIds;
      estate.Price = element.price;
      estate.Address1 = element.address1;
      estate.Zip = element.zip;
      estate.City = element.city;
      estate.VaegtetAreal = element.vaegtetAreal;
      estate.Areal = element.areal;
      estate.GrundAreal = element.grundAreal;
      estate.ThumbNailFilePathAndName = element.thumbNailFilePathAndName;
      estate.NoOfRooms = element.noOfRooms;
      estate.BuildedYear = element.buildedYear;

      estate.CreatedDate = element.createdDate;
      estate.ModifiedDate = element.modifiedDate;
      this.viewModel.push(estate);
    })
  }
}
