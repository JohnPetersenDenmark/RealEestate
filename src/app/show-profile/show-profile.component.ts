import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstateService } from '../estate.service';
import { Estate } from '../models/Estate.model';

import { Profile } from '../models/profile.model';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {

  viewModel: Profile = new Profile;

  estates: any[] = [];

  constructor(private _profileService: ProfileService, private estateService: EstateService, private router: Router) { }


  ngOnInit(): void {

    let myObserverable = this._profileService.getMyProfile();

    let myObserver = {

      next: (x: any) => {
        this.viewModel.email = x.email;
        this.viewModel.id = x.id;
        this.viewModel.fullName = x.fullName;
        this.viewModel.address1 = x.address1;
        this.viewModel.address2 = x.address2;
        this.viewModel.zip = x.zip;
        this.viewModel.city = x.city;
        this.viewModel.phone = x.phone;
        this.viewModel.createdDate = x.createdDate;
        this.viewModel.modifiedDate = x.modifiedDate;

        this.estateService.getEstateByProfile(this.viewModel).subscribe((x: any[]) => {
          x.forEach((element: any) => {
            console.log("ejendomme" + element.address1);
            let estate = this.estateService.estateModelMappingForGet(element);
            this.estates.push(estate);

          });
        });

      },
      error: (err: any) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
    myObserverable.subscribe(myObserver);
  }

  createEstate(): void {
    this._profileService.currentProfile = this.viewModel;
    this.router.navigate(["estate"]);
  }

  godEditProfile(): void {
    this._profileService.currentProfile = this.viewModel;
    this.router.navigate(['editprofile']);
  }

  goReadEstate(event: Event) {

    const element = event.currentTarget as HTMLInputElement;
    let estateId = element.attributes.getNamedItemNS(null, "id")?.nodeValue;

    let selectedEstate = this.estates.find(x => x.Id === estateId);
    this.estateService.selectedEstate = selectedEstate;
    this.router.navigate(["show-estate"]);

    console.log("klikket på" + selectedEstate.Id);

  }
}
