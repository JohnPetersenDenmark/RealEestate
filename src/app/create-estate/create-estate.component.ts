import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstateService } from '../estate.service';
import { Estate } from '../models/Estate.model';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../profile.service';


@Component({
  selector: 'app-create-estate',
  templateUrl: './create-estate.component.html',
  styleUrls: ['./create-estate.component.css']
})
export class CreateEstateComponent implements OnInit {

  estate: Estate = new Estate();

  currentProfile: Profile = new Profile();
  constructor(private estateService: EstateService, private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    this.currentProfile = this.profileService.currentProfile
  }

  saveEstate(): void {
    this.estate.OwnerIdentityUserIds = this.currentProfile.id.toString();
   

    this.estateService.saveEstate(this.estate).subscribe((data: Estate) => {
      console.log(data);
      // profileForm.reset(); 
      this.router.navigate(["showmyprofile"])
    },
      (error: any) => { console.log(error); }
    );

    
   }
}
