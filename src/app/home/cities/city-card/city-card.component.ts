import { Component, OnInit, Input, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { City } from 'src/app/shared/models/city.model'
import { Router } from '@angular/router';
import { SharedHomeService } from 'src/app/shared/services/shared-home.service';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { CityService } from 'src/app/shared/services/city.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.sass']
})
export class CityCardComponent implements OnInit {

  @Input() city: City
  @ViewChild('modalPopUpConfirm', { static: false }) modalPopUpConfirm: TemplateRef<any>;
  private weatherSubscription: any;
  private citySubscription: any;
  private modalReference: any;
  canShowCityCard: boolean = false;
  canShowDeleteButton: boolean = false;

  constructor(private location: PlatformLocation, private modalService: NgbModal, private spinner: NgxSpinnerService, private weatherService: WeatherService, private cityService: CityService, private router: Router, private sharedHomeService: SharedHomeService) { }

  ngOnInit() {
    this.weatherSubscription = this.weatherService.getWeatherInfoCity(this.city).subscribe(
      (res) => {
        this.city = res;
        this.canShowCityCard = true;
      },
      (err) => {
        console.log("Error ngOnInit@CityCardComponent: ")
        console.log("City: " + this.city)
        console.log(err)
      }
    )
  }

  openDetailsCity() {
    this.sharedHomeService.citySelected = this.city;
    this.router.navigate([`/details/${this.city.slug}`])
  }

  openPopUpConfirm(){
    this.modalReference = this.modalService.open(this.modalPopUpConfirm, { windowClass: 'modal-popout-confirm' });
    // Closes modal when back button is clicked
    this.location.onPopState(() => this.modalReference.close());
  }

  removeCity() {
    this.spinner.show();
    this.citySubscription = this.cityService.removeCity(this.city).subscribe(
      (res) => {
        this.spinner.hide();
        this.sharedHomeService.removeCityToUsersCities(this.city)
      },
      (err) => {
        this.spinner.hide();
        console.log("Error removeCity@CityCardComponent: ")
        console.log("City: " + this.city)
        console.log(err)
      }
    );
  }

  ngOnDestroy() {
    this.spinner.hide();
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
    if (this.citySubscription) {
      this.citySubscription.unsubscribe();
    }
  }

}
