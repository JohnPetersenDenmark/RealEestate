import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { CheckIfLoggedInService } from './check-if-logged-in.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RealEestate';
  public isLoggedIn = false;


  constructor(private checkIfLoggedInService: CheckIfLoggedInService) { }


  ngOnInit() {
    console.log("on init app component");

    let observable = this.checkIfLoggedInService.IsLoggedInAA().subscribe( result => {      
        this.isLoggedIn = true;
        console.log("got answer true ");
      },
      error => {
        console.error('Observer got an error: ');
        this.isLoggedIn = false;
      },

       () => console.log('Observer got a complete notification'),


    );


    console.log( "in oninit in app.component" );

    let secondsCounter = interval(10000);
    const subscription = secondsCounter.subscribe(n => {
      console.log(`It's been ${n + 1} seconds since subscribing!`);

      let observable = this.checkIfLoggedInService.IsLoggedInAA().subscribe( result => {      
        this.isLoggedIn = true;
        console.log("got answer true ");
      },
      error => {
        console.error('Observer got an error: ');
        this.isLoggedIn = false;
      },

       () => console.log('Observer got a complete notification'),


    );

    });

  }




}
