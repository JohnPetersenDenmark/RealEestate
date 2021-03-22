import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstateService } from '../estate.service';
import { Estate } from '../models/Estate.model';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-edit-estate',
  templateUrl: './edit-estate.component.html',
  styleUrls: ['./edit-estate.component.css']
})
export class EditEstateComponent implements OnInit {

  estate: Estate = new Estate();

  currentProfile: Profile = new Profile();

  constructor(private estateService: EstateService, private router: Router, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.currentProfile = this.profileService.currentProfile;
    this.estate = this.estateService.selectedEstate;
  }



  saveEstate(): void {
    
    this.estateService.updateEstate(this.estate).subscribe((data: Estate) => {
      console.log(data);
      // profileForm.reset(); 
      this.router.navigate(["showmyprofile"])
    },
      (error: any) => { console.log(error); }
    );


  }
}
