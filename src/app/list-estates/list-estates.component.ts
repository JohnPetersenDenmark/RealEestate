import { Component, OnInit } from '@angular/core';
import { EstateService } from '../estate.service';
import { Estate } from '../models/Estate.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Options } from '@angular-slider/ngx-slider';
import { EstateSearchHit } from '../models/search-hit.model';



@Component({
  templateUrl: './list-estates.component.html',
  styleUrls: ['./list-estates.component.css']
})

export class ListEstatesComponent implements OnInit {

  viewModel: Estate[] = [];
  filteredEstates: Estate[] = [];

  searchTerms: EstateSearchHit[] = [];
  selectedSearchTerm = new EstateSearchHit();

  

  public pageSize: number = 10;
  public pageNumber: number = 1;
  public Count!: number;

  value: number = 1;
  options: Options = {
    floor: 1,
    ceil: 8
  };





  private _searchString: string = "";

  get searchString(): string {
    console.log("in GET searchString " + this._searchString)
    return this._searchString;
  }

  set searchString(searchStr: string) {
    console.log("in SET searchString. Before setting value " + this._searchString)
    this._searchString = searchStr;
    this.searchTerms = [] as EstateSearchHit[];
    this.searchTerms = this.getEtateHits(searchStr);
    console.log("in SET searchString. After setting value " + this._searchString);
    console.log("in SET searchString. number of hits " + this.searchTerms.length)
  }

  getEtateHits(searchStr: string): EstateSearchHit[] {
    let searchTermsAddress: EstateSearchHit[] = [];
    let searchTermsCity: EstateSearchHit[] = [];
    let searchTermsZip: EstateSearchHit[] = [];

    let searchTermsAll: EstateSearchHit[] = [];


    this.viewModel.forEach((estate: Estate) => {

      let textToSearchIn = estate.Address1.toLowerCase();
      let tmpArray =  this.findHit(textToSearchIn, searchStr.toLowerCase(), "Sted")
      tmpArray.forEach(tmpHit => {searchTermsAddress.push(tmpHit)} )
      console.log("searchTermsAddress " + searchTermsAddress.length);
      
      textToSearchIn = estate.City.toLowerCase();
      tmpArray = this.findHit(textToSearchIn, searchStr.toLowerCase(), "By");
      tmpArray.forEach(tmpHit => {searchTermsCity.push(tmpHit)} )

      textToSearchIn = estate.Zip.toLowerCase();
      tmpArray = this.findHit(textToSearchIn, searchStr.toLowerCase(),  "Postnr.");
      tmpArray.forEach(tmpHit => {searchTermsZip.push(tmpHit)} )
    })

    if (searchTermsAddress.length > 0) {
      console.log("in have a address hit ")
      let hit = new EstateSearchHit();
      hit.FoundInCategory = "Sted"
      hit.IsDivider = true;
      searchTermsAll.push(hit);
      searchTermsAddress.forEach(tmpHit => {searchTermsAll.push(tmpHit)} )     
    }

    if (searchTermsCity.length > 0) {
      let hit = new EstateSearchHit();
      hit.FoundInCategory = "By"
      hit.IsDivider = true;
      searchTermsAll.push(hit);
      searchTermsCity.forEach(tmpHit => {searchTermsAll.push(tmpHit)} )          
    }

    if (searchTermsZip.length > 0) {
      let hit = new EstateSearchHit();
      hit.FoundInCategory = "Postnr."
      hit.IsDivider = true;
      searchTermsAll.push(hit);
      searchTermsZip.forEach(tmpHit => {searchTermsAll.push(tmpHit)} )    
    }

    return searchTermsAll;

  }

  findHit(textToSearchIn: string, searchStr: string,  category: string): EstateSearchHit[] {

    let hitArray: EstateSearchHit[] = [];


    console.log("findHit ")

    let pos = textToSearchIn.indexOf(searchStr.toLowerCase());
    if (pos !== -1) {
      // let x = this.searchTerms.find(tmpHit => tmpHit.FoundInCategory == category && tmpHit.TextHit == searchStr);
      // if (x == undefined) {
        console.log("findHit we got a hit");
      let hit = new EstateSearchHit();
      hit.FoundInCategory = category;
      hit.TextBeforeHit = textToSearchIn.substring(0, pos);
      hit.TextHit = textToSearchIn.substring(pos, pos + searchStr.length);
      hit.TextAfterHit = textToSearchIn.substring(pos + searchStr.length);

      hitArray.push(hit);
      // }
    }

    return hitArray;
  }

  setSearchTerm(searchTerm: EstateSearchHit) {
    this.searchString = searchTerm.TextBeforeHit + searchTerm.TextHit + searchTerm.TextAfterHit;
    this.selectedSearchTerm = searchTerm;
    this.searchTerms = [] as EstateSearchHit[];
  }


  filterEstates() {
    console.log("in filter estates " + this.selectedSearchTerm.TextHit.toLowerCase());
    if (this.selectedSearchTerm.FoundInCategory == "Sted")
    {
      this.filteredEstates = this.viewModel.filter(estate =>
        estate.Address1.toLowerCase().indexOf
        (this.selectedSearchTerm.TextHit.toLowerCase() + this.selectedSearchTerm.TextAfterHit.toLowerCase()) !== -1);
    }

    if (this.selectedSearchTerm.FoundInCategory == "By")
    {
      console.log("in filter estates by postnr " + this.selectedSearchTerm.TextHit.toLowerCase());
      this.filteredEstates = this.viewModel.filter(estate =>
        estate.City.toLowerCase().indexOf(this.selectedSearchTerm.TextHit.toLowerCase()+ this.selectedSearchTerm.TextAfterHit.toLowerCase()) !== -1);
        console.log("in filter estates by postnr  hit count " + this.filteredEstates.length);
        console.log("in filter estates by postnr  viewModel " + this.viewModel.length);
    }

    if (this.selectedSearchTerm.FoundInCategory == "Postnr.")
    {
      this.filteredEstates = this.viewModel.filter(estate =>
        estate.Zip.toLowerCase().indexOf(this.selectedSearchTerm.TextHit.toLowerCase()) !== -1);
    }


  }

  constructor(private _estateService: EstateService, private router: Router) {

  }


  ngOnInit() {
    this._estateService.getEstateList().subscribe(result => {
      this.mapEstate(result);
      this.Count = result.length;
      this.filteredEstates = this.viewModel;
    }, error => console.error(error));
  }

  public onPageChange = (pageNumber: any) => {
    this.pageNumber = pageNumber;

  }
  goReadEstate(estateId: string) {

    console.log("klikket på");
    let selectedEstate = this.viewModel.find(x => x.Id === estateId);
    this._estateService.selectedEstate = selectedEstate;
    this.router.navigate(["publicestate"]);

    console.log("klikket på" + estateId);

  }

  mapEstate(estateList: any[]) {

    estateList.forEach((element: any) => {
      let estate = new Estate();
      estate.Id = element.id;
      estate.RegistrationNumber = element.registrationNumber;
      estate.BuyerIdentityUserIds = element.buyerIdentityUserIds;
      estate.OwnerIdentityUserIds = element.ownerIdentityUserIds;
      estate.Price = element.price;
      estate.Address1 = element.address1;
      estate.Zip = element.zip;
      estate.City = element.city;
      estate.VaegtetAreal = element.vaegtetAreal;
      estate.Areal = element.areal;
      estate.GrundAreal = element.grundAreal;
      estate.ThumbNailFilePathAndName = element.thumbNailFilePathAndName;
      estate.NoOfRooms = element.noOfRooms;
      estate.BuildedYear = element.buildedYear;

      estate.CreatedDate = element.createdDate;
      estate.ModifiedDate = element.modifiedDate;
      this.viewModel.push(estate);
    })
  }
}
