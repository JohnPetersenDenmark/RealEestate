import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateProfile } from '../models/create-profile.model';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

  profile: CreateProfile = {
    email: "",
    password: "",
    confirmPassword: ""
  };

  constructor(private _profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
  }

  saveProfile(profileForm: NgForm): void {
    this._profileService.save(this.profile).subscribe((data: CreateProfile) => {
      console.log(data);
      // profileForm.reset(); 
       this.router.navigate(['login']);
    },
      (error: any) => { console.log(error); }
    );
  }
}


