import { Component, OnInit, ViewChild, TemplateRef, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlatformLocation } from '@angular/common';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { City } from 'src/app/shared/models/city.model';
import { CitySearchService } from 'src/app/shared/services/city-search.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.sass']
})
export class AddCityComponent implements OnInit {

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event) {
    this.closePanel();
  }
  @ViewChild('modalAddCity', { static: false }) modalAddCity: TemplateRef<any>;
  public queryInput;
  public query: string;
  public isSearching: boolean = false;
  public showMessageSearch: boolean = false;
  public messageSearch: string = "";
  public canRepeatSearchRequest: boolean = false;
  public foundCities: City[];
  private modalReference: any;


  constructor(private elementRef: ElementRef, private modalService: NgbModal, private location: PlatformLocation, private citySearchService: CitySearchService) { }

  ngOnInit() {

  }

  open() {
    this.modalReference = this.modalService.open(this.modalAddCity,  { windowClass: 'modal-add-city' });
    this.loadSubscriptionOptions();
    // Closes modal when back button is clicked
    this.location.onPopState(() => this.modalReference.close());
  }

  loadSubscriptionOptions() {
    // Observable for Event KeyUp of element queryInput
    this.queryInput = this.elementRef.nativeElement.ownerDocument.querySelector('#queryInput');
    fromEvent(this.queryInput, 'keyup').pipe(
      //Gets value
      map((event: any) => {
        return event.target.value;
      }),
      // ==> Minimum 3 for query
      filter(res => {
        if (res.length <= 2) {
          this.messageSearch = "Search must be at least 3 characters long."
          this.showMessageSearch = true;
      
        }
        if (res.length <= 0) {
          this.closePanel();
        }

        return res.length >= 3
      }),
      // ==> Time in milliseconds between events
      debounceTime(600),
      // ==> Value of queryInput must be different from previous
      distinctUntilChanged((valueOne: any, valueTwo: any) => {
        if (valueOne === valueTwo && !this.canRepeatSearchRequest) {
          return true; // This means values are equal, it will not emit the current value
          // Also it can't repeat the search
        }
        else {
          return false;// This means the values are different or it can repeat, so it will emit
        }
      }),
      // Subscription for response
    ).subscribe(query => this.searchCitiesRequest(query));

  }

  searchCitiesRequest(query) {
    this.isSearching = true;
    this.foundCities = null;
    this.canRepeatSearchRequest = false;
    this.showMessageSearch = false;
      this.citySearchService.searchCities(query).subscribe(
        (res) => {
          this.foundCities = res;
          this.isSearching = false;
          if (this.foundCities.length <= 0) {
            this.messageSearch = "No results."
            this.showMessageSearch = true;
          }
        },
        (err) => {
          console.log(err)
          this.isSearching = false; 
          this.messageSearch = "No results."
          this.showMessageSearch = true;
        }
      )
    
  }

  closePanel(){
    this.query = "";
    this.foundCities = null;
    this.canRepeatSearchRequest = true;
    this.messageSearch = ""
  }

}
