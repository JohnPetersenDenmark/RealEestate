import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profile: Profile = new Profile();

  constructor(private _profileService: ProfileService, private router: Router) { }


  saveProfile(): void {
    console.log("her er den rettede profil " + this.profile.fullName);
    this._profileService.saveEditedProfile(this.profile).subscribe((data: Profile) => {
      console.log(data);
       this.router.navigate(['showmyprofile']);
    },
      (error: any) => { console.log(error); }
    );
  }

  ngOnInit(): void {
    this.profile = this._profileService.currentProfile
  }

}
