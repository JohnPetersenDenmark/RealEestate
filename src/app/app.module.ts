import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';

import { Compare2fieldsValidatorDirective } from 'src/shared/compare2fields-validator-directive';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import {ProfileService} from './profile.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ShowProfileComponent } from './show-profile/show-profile.component';
import { ListEstatesComponent } from './list-estates/list-estates.component';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { EstateService } from './estate.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


const appRoutes : Routes = [
{path: 'login', component : LoginComponent}, 
{path: 'profile', component : ProfileComponent},
{path: 'showmyprofile', component : ShowProfileComponent},
{path: 'editprofile', component : EditProfileComponent},
{path: 'createprofile', component : CreateProfileComponent},
{path: 'list-estates', component : ListEstatesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    CreateProfileComponent,
    Compare2fieldsValidatorDirective,
    ShowProfileComponent,
    ListEstatesComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
   
  ],
  providers: [ProfileService, EstateService, { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
