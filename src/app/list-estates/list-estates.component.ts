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


  public pageSize: number = 10;
  public pageNumber: number = 1;
  public Count!: number;

  value: number = 1;
  options: Options = {
    floor: 1,
    ceil: 8
  };





  private _searchString: string = "";
  searchTerms: EstateSearchHit[] = [];
  get searchString(): string {
    console.log("in GET searchString " + this._searchString)
    return this._searchString;
  }

  set searchString(value: string) {
    console.log("in SET searchString. Before setting value " + this._searchString)
    this._searchString = value;
    //this.searchTerms = this.getEtateHits(value);
    this.searchTerms = [] as EstateSearchHit[];
    this.getEtateHits(value);
    console.log("in SET searchString. After setting value " + this._searchString)
  }

  getEtateHits(searchStr: string): void {

    let hits: EstateSearchHit[] = [];

    this.viewModel.forEach((estate: Estate) => {

      let textToSearchIn = estate.Address1.toLowerCase();
      this.findHit(textToSearchIn,searchStr.toLowerCase(),"Sted");

      textToSearchIn = estate.City.toLowerCase();
      this.findHit(textToSearchIn,searchStr.toLowerCase(),"By");

      textToSearchIn = estate.Zip.toLowerCase();
      this.findHit(textToSearchIn,searchStr.toLowerCase(),"Postnr.");     
    })

    return ;

  }

  findHit(textToSearchIn: string, searchStr: string, category: string): void {
    
    let pos = textToSearchIn.indexOf(searchStr.toLowerCase());
    if (pos !== -1) {
      let hit = new EstateSearchHit();
      hit.FoundInCategory = category;
      hit.TextBeforeHit = textToSearchIn.substring(0, pos -1);
      hit.TextHit = textToSearchIn.substring(pos  ,pos + searchStr.length );
      hit.TextAfterHit = textToSearchIn.substring( pos + searchStr.length);
    
      this.searchTerms.push(hit);
    }
  }

  setSearchTerm(searchTerm: EstateSearchHit) {
    this.searchString = searchTerm.TextBeforeHit + searchTerm.TextHit + searchTerm.TextAfterHit;
  }












  private _searchTerm: string = "";

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEstates = this.filterEstates(value);
  }

  filterEstates(searchString: string) {
    return this.viewModel.filter(estate =>
      estate.Address1.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
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
