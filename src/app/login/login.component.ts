import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from '../models/login.model';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';

@Component({  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = {
    email: "",
    password: ""
  };


  constructor(private _profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(profileForm: NgForm): void {

   this._profileService.login(this.login).subscribe((data: string) => {
   
    sessionStorage.setItem("EestateToken", data);

      console.log(data);
      // profileForm.reset();
       this.router.navigate(['showmyprofile']);
    },
      (error: any) => { console.log(error); }
    );


  }

}
