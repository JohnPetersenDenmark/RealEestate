import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { EstateService } from '../estate.service';
import { Estate } from '../models/Estate.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Options, CustomStepDefinition, LabelType } from '@angular-slider/ngx-slider';
import { EstateSearchHit } from '../models/search-hit.model';
import { SlidersComponent } from '../sliders/sliders.component';



@Component({
  templateUrl: './list-estates.component.html',
  styleUrls: ['./list-estates.component.css']
})

export class ListEstatesComponent implements OnInit, AfterViewInit {


  constructor(private _estateService: EstateService, private router: Router) {

  }

  @ViewChildren(SlidersComponent) child!: QueryList<SlidersComponent>;

  ngAfterViewInit() {
    console.log("slider estateValue ");
    this.child.forEach(slider => {

      console.log("slider  " + slider.lowValue);
    });
  }

  viewModel: Estate[] = [];
  filteredEstates: Estate[] = [];

  searchTerms: EstateSearchHit[] = [];
  selectedSearchTerm = new EstateSearchHit();


  public pageSize: number = 10;
  public pageNumber: number = 1;
  public Count!: number;



  showEstateTypeSlider: boolean = false;
  estateTypes: string[] = ["Villa", "Sommerhus", "Rækkehus", "Ejerlejlighed"]

  estateTypeStr: string = "Sommerhus";
  _estateTypeValue: number = this.estateTypeToIndex('Sommerhus');

  get estateTypeValue(): number {
    return this._estateTypeValue
  }

  set estateTypeValue(val: number) {
    console.log("in set estateTypeValue")
    this._estateTypeValue = val;
    this.estateTypeStr = this.indexToEstateType(val)
  }

  estateTypeOptions: Options = {
    stepsArray: this.estateTypes.map((estateType: string): CustomStepDefinition => {
      console.log("in stepsarray")
      return { value: this.estateTypeToIndex(estateType) };
    }),
    translate: (value: number, label: LabelType): string => {
      return this.indexToEstateType(value);
    },
    showTicks: true,
    showTicksValues: true
  };

  indexToEstateType(index: number): string {
    return this.estateTypes[index];
  }

  estateTypeToIndex(letter: string): number {
    return this.estateTypes.indexOf(letter);
  }


  sHowRoomSlider: boolean = false;
  roomMinValue: number = 1;
  roomMaxValue: number = 8;
  roomOptions: Options = {
    floor: 1,
    ceil: 8,
    step: 1,
    showTicks: true
  };

  sHowPriceSlider: boolean = true;
  priceFromToString!: string;

  _priceFromMillionsMinValue: number = 0;

  get priceFromMillionsMinValue(): number {
    return this._priceFromMillionsMinValue;
  }

  set priceFromMillionsMinValue(val: number) {
    let oldVal = this._priceFromMillionsMinValue;
    this._priceFromMillionsMinValue = val;
    console.log(" setting priceFromMillionsMinValue to  new  value" + val)

    if (!this.IsToPriceLargerThanFromPrice(val, this.priceFrom100KMinValue,
      this.priceToMillionsMinValue, this._priceTo100KMinValue)) {

      console.log(" !PriceLargerThanFromPrice ")
      this._priceFromMillionsMinValue = oldVal;
      let index = 0;
      this.child.forEach(slider => {
        if (index == 0) {
          slider.lowValue = oldVal;

        }
        this.child.dirty;
      })
      //this.priceFromMillionsMinValueCorrected = oldVal;


      console.log(" setting priceFromMillionsMinValue to  old value" + oldVal)
    }
    // else {
    //   this._priceFromMillionsMinValue = val;
    //   console.log(" setting priceFromMillionsMinValue to  new  value" + val)
    // }

    this.formatFromToPriceString();

    // this.priceToMillionsOptions = this.setNewFloor(val, this.priceToMillionsOptions);
    // this.priceToMillionsMinValue = val;
  }

  priceFromMillionsOptions: Options = {
    floor: 0,
    ceil: 10,
    step: 1,
    showTicks: true,
    showTicksValues: true
  };

  _priceFrom100KMinValue: number = 0;
  get priceFrom100KMinValue(): number {
    return this._priceFrom100KMinValue;
  }

  set priceFrom100KMinValue(val: number) {
    let oldVal = this._priceFrom100KMinValue;
    console.log(" priceFrom100KMinValue  old new" + oldVal + " " + val)
    this._priceFrom100KMinValue = val;
    if (!this.IsToPriceLargerThanFromPrice(this.priceFromMillionsMinValue, val,
      this.priceToMillionsMinValue, this._priceTo100KMinValue)) {
      console.log(" !PriceLargerThanFromPrice " + this._priceToMillionsMinValue)
      this._priceFrom100KMinValue = oldVal;
    }
    this.formatFromToPriceString();
    // this.priceTo100KOptions = this.setNewFloor(val, this.priceFrom100KOptions);
    // this.priceTo100KMinValue = val;
  }

  priceFrom100KOptions: Options = {
    floor: 0,
    ceil: 9,
    step: 1,
    showTicks: true,
    showTicksValues: true
  };

  _priceToMillionsMinValue: number = 2;
  get priceToMillionsMinValue(): number {
    return this._priceToMillionsMinValue;
  }

  set priceToMillionsMinValue(val: number) {
    this._priceToMillionsMinValue = val;
    console.log("priceToMillionsMinValue " + this._priceToMillionsMinValue)
    this.formatFromToPriceString();
  }
  priceToMillionsOptions: Options = {
    floor: 0,
    ceil: 10,
    step: 1,
    showTicks: true,
    showTicksValues: true
  };

  _priceTo100KMinValue: number = 3;
  get priceTo100KMinValue(): number {
    return this._priceTo100KMinValue;
  }

  set priceTo100KMinValue(val: number) {
    this._priceTo100KMinValue = val;
    this.formatFromToPriceString();
  }
  priceTo100KOptions: Options = {
    floor: 0,
    ceil: 9,
    step: 1,
    showTicks: true,
    showTicksValues: true
  };

  IsToPriceLargerThanFromPrice(priceFromMillionsVal: number, priceFrom200KVal: number,
    priceToMillionsVal: number, priceTo200KVal: number): boolean {
    let fromPriceString: string = priceFromMillionsVal + "." + priceFrom200KVal;
    let toPriceString: string = priceToMillionsVal + "." + priceTo200KVal;

    let fromPrice: number = parseFloat(fromPriceString);
    let toPrice: number = parseFloat(toPriceString);

    console.log(" from price  to price " + fromPrice + " " + toPrice)

    if (toPrice >= fromPrice) {
      return true;
    }

    return false;
  }

  setNewFloor(newFloor: number, options: Options): Options {
    // Due to change detection rules in Angular, we need to re-create the options object to apply the change
    const newOptions: Options = Object.assign({}, options);
    newOptions.floor = newFloor;
    return newOptions;
  }

  formatFromToPriceString() {

    this.priceFromToString = "fra: "

    if (this.priceFromMillionsMinValue > 0) {
      this.priceFromToString = this.priceFromToString + this.priceFromMillionsMinValue + ".";
    }

    this.priceFromToString = this.priceFromToString + this.priceFrom100KMinValue + "00.000";

    this.priceFromToString = this.priceFromToString + " til: ";

    if (this.priceToMillionsMinValue > 0) {
      this.priceFromToString = this.priceFromToString + this.priceToMillionsMinValue + "."
    }

    this.priceFromToString = this.priceFromToString + this.priceTo100KMinValue + "00.000";
  }



  private _searchString: string = "";

  get searchString(): string {
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
      let tmpArray = this.findHit(textToSearchIn, searchStr.toLowerCase(), "Sted")
      tmpArray.forEach(tmpHit => { searchTermsAddress.push(tmpHit) })
      console.log("searchTermsAddress " + searchTermsAddress.length);

      textToSearchIn = estate.City.toLowerCase();
      tmpArray = this.findHit(textToSearchIn, searchStr.toLowerCase(), "By");
      tmpArray.forEach(tmpHit => { searchTermsCity.push(tmpHit) })

      textToSearchIn = estate.Zip.toLowerCase();
      tmpArray = this.findHit(textToSearchIn, searchStr.toLowerCase(), "Postnr.");
      tmpArray.forEach(tmpHit => { searchTermsZip.push(tmpHit) })
    })

    if (searchTermsAddress.length > 0) {
      console.log("in have a address hit ")
      let hit = new EstateSearchHit();
      hit.FoundInCategory = "Sted"
      hit.IsDivider = true;
      searchTermsAll.push(hit);
      searchTermsAddress.forEach(tmpHit => { searchTermsAll.push(tmpHit) })
    }

    if (searchTermsCity.length > 0) {
      let hit = new EstateSearchHit();
      hit.FoundInCategory = "By"
      hit.IsDivider = true;
      searchTermsAll.push(hit);
      searchTermsCity.forEach(tmpHit => { searchTermsAll.push(tmpHit) })
    }

    if (searchTermsZip.length > 0) {
      let hit = new EstateSearchHit();
      hit.FoundInCategory = "Postnr."
      hit.IsDivider = true;
      searchTermsAll.push(hit);
      searchTermsZip.forEach(tmpHit => { searchTermsAll.push(tmpHit) })
    }

    return searchTermsAll;

  }

  findHit(textToSearchIn: string, searchStr: string, category: string): EstateSearchHit[] {

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
    if (this.selectedSearchTerm.FoundInCategory == "Sted") {
      this.filteredEstates = this.viewModel.filter(estate =>
        estate.Address1.toLowerCase().indexOf
          (this.selectedSearchTerm.TextHit.toLowerCase() + this.selectedSearchTerm.TextAfterHit.toLowerCase()) !== -1);
    }

    if (this.selectedSearchTerm.FoundInCategory == "By") {
      console.log("in filter estates by postnr " + this.selectedSearchTerm.TextHit.toLowerCase());
      this.filteredEstates = this.viewModel.filter(estate =>
        estate.City.toLowerCase().indexOf(this.selectedSearchTerm.TextHit.toLowerCase() + this.selectedSearchTerm.TextAfterHit.toLowerCase()) !== -1);
      console.log("in filter estates by postnr  hit count " + this.filteredEstates.length);
      console.log("in filter estates by postnr  viewModel " + this.viewModel.length);
    }

    if (this.selectedSearchTerm.FoundInCategory == "Postnr.") {
      this.filteredEstates = this.viewModel.filter(estate =>
        estate.Zip.toLowerCase().indexOf(this.selectedSearchTerm.TextHit.toLowerCase()) !== -1);
    }


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

  ToogleSHowEstateTypeSlider() {
    if (this.showEstateTypeSlider) {
      this.showEstateTypeSlider = false;
    }
    else {
      this.showEstateTypeSlider = true;
    }
  }

  ToogleSHowRoomSlider() {
    if (this.sHowRoomSlider) {
      this.sHowRoomSlider = false;
    }
    else {
      this.sHowRoomSlider = true;
    }
  }



  ToogleshowEstateTypeSlider
    () {
    if (this.showEstateTypeSlider) {
      this.showEstateTypeSlider = false;
    }
    else {
      this.showEstateTypeSlider = true;
    }
  }

  ToogleSHowPriceSlider
    () {
    if (this.sHowPriceSlider) {
      this.sHowPriceSlider = false;
    }
    else {
      this.sHowPriceSlider = true;
    }
  }


}
