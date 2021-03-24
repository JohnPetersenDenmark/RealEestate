import { Component, OnInit } from '@angular/core';
import { EstateService } from '../estate.service';
import { Estate } from '../models/Estate.model';
import { Observable} from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators'


@Component({
  templateUrl: './list-estates.component.html',
  styleUrls: ['./list-estates.component.css']
})

export class ListEstatesComponent implements OnInit {

  viewModel: Estate[] = [];
  
  constructor(private _estateService: EstateService) { }


  ngOnInit() {

  let myObserverable = this._estateService.getEstateList();

  let  myObserver = {  

    next: (x: any[]) => {     
    x.forEach((element: any) => 
    {
      let estate = new Estate();
      estate.Id = element.id;
      estate.RegistrationNumber = element.registrationNumber;
      estate.BuyerIdentityUserIds = element.buyerIdentityUserIds;
      estate.OwnerIdentityUserIds =  element.ownerIdentityUserIds;
      estate.Price =  element.price;
      estate.Address1 =  element.address1;
      estate.Zip =  element.zip;
      estate.City =  element.city;
      estate.VaegtetAreal =  element.vaegtetAreal;
      estate.Areal =  element.areal; 
      estate.GrundAreal =  element.grundAreal;
      estate.ThumbNailFilePathAndName = element.thumbNailFilePathAndName;
      estate.NoOfRooms = element.noOfRooms;
      estate.BuildedYear = element.buildedYear;
      
      estate.CreatedDate = element.createdDate;
      estate.ModifiedDate = element.modifiedDate;
      this.viewModel.push(estate);
 
    }  )           
    },
    error: (err: any) => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };
 
  myObserverable.subscribe(myObserver)

  }

}
