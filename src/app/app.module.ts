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
import { LogoutComponent } from './logout/logout.component';
import { ShowEstateComponent } from './show-estate/show-estate.component';
import { CreateEstateComponent } from './create-estate/create-estate.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { DndDirective } from './dnd.directive';
import { ProgressComponent } from './Progress/progress/progress.component';
import { DownloadFileComponent } from './download-file/download-file.component';
import { ShowFileComponent } from './show-file/show-file.component';
import { ShowImageComponent } from './show-image/show-image.component';
import { AddFileComponent } from './add-file/add-file.component';
import { EstateImgageCarouselComponent } from './estate-imgage-carousel/estate-imgage-carousel.component';
import { AddImageComponent } from './add-image/add-image.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EditEstateComponent } from './edit-estate/edit-estate.component';
import { ShowPublicEstateComponent } from './show-public-estate/show-public-estate.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxTypeaheadModule } from "ngx-typeahead";
import { SlidersComponent } from './sliders/sliders.component';



 
const appRoutes : Routes = [
{path: 'login', component : LoginComponent}, 
{path: 'profile', component : ProfileComponent},
{path: 'showmyprofile', component : ShowProfileComponent},
{path: 'editprofile', component : EditProfileComponent},
{path: 'createprofile', component : CreateProfileComponent},
{path: 'list-estates', component : ListEstatesComponent},
{path: 'show-estate', component : ShowEstateComponent},
{path: 'estate', component : CreateEstateComponent},
{path: 'logout', component : LogoutComponent},
{path: 'upload', component : UploadFileComponent},
{path: 'add-file', component : AddFileComponent},
{path: 'add-image', component : AddImageComponent},
{path: 'editestate', component : EditEstateComponent},
{path: 'publicestate', component : ShowPublicEstateComponent},
{path: 'slider', component : SlidersComponent}
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
    EditProfileComponent,
    LogoutComponent,
    ShowEstateComponent,
    CreateEstateComponent,
    UploadFileComponent,
    DndDirective,
    ProgressComponent,
    DownloadFileComponent,
    ShowFileComponent,
    ShowImageComponent,
    AddFileComponent,
    EstateImgageCarouselComponent,
    AddImageComponent,
    EditEstateComponent,
    ShowPublicEstateComponent,
    SlidersComponent,  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    NgxPaginationModule,
    NgxSliderModule,
    NgxTypeaheadModule
  ],
  providers: [ProfileService, EstateService, { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
