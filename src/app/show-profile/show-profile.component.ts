import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {

  viewModel: Profile = new Profile;

  constructor(private _profileService: ProfileService, private router: Router) { }

  godEditProfile() : void
  {
    this._profileService.currentProfile = this.viewModel;
    this.router.navigate(['editprofile']);
  }

  ngOnInit(): void {

    let myObserverable = this._profileService.getMyProfile();

    let  myObserver = {  

      next: (x: any) => {     
            this.viewModel.email = x.email;       
            this.viewModel.id = x.id;
            this.viewModel.fullName = x.fullName;
            this.viewModel.address1 = x.address1;
            this.viewModel.address2 = x.address2;
            this.viewModel.zip = x.zip;
            this.viewModel.city = x.city;
            this.viewModel.phone = x.phone;
      },
      error: (err: any) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
    myObserverable.subscribe(myObserver);
  }

}
