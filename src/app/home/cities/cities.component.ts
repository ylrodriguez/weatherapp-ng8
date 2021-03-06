import { Component, OnInit, OnDestroy } from '@angular/core';
import { City } from 'src/app/shared/models/city.model';
import { CityService } from 'src/app/shared/services/city.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SharedHomeService } from 'src/app/shared/services/shared-home.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.sass']
})
export class CitiesComponent implements OnInit {

  private citiesSubscription: any;
  private userCitiesSubscription: any;
  cities: City[] = [];
  private firstTimeLoadingCities: boolean = true;

  constructor(private sharedHomeService: SharedHomeService, private cityService: CityService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.userCitiesSubscription = this.sharedHomeService.userCities.subscribe(userCities => {
      this.spinner.show();

      if (userCities.length || userCities['function'] == "remove") { //App has cities saved or it's removing the last one.
        this.spinner.hide();

        if (this.firstTimeLoadingCities) { // It is the first time that it's going to load the cities
          this.firstTimeLoadingCities = false;
          for (let city of userCities) {
            this.cities.push(city)
          }
        }
        else if (userCities['function'] == "add"){
          let lastIndex = userCities.length - 1;
          let lastCity = userCities[lastIndex];
          this.cities.push(lastCity);
        }
        else if (userCities['function'] == "remove"){
          this.cities = [];
          for (let city of userCities) {
            this.cities.push(city)
          }
        }

      }
      else {
        this.citiesSubscription = this.cityService.getCities().subscribe(
          (res) => {
            if (!res.length) {
              console.log("No tiene ciudades");
              this.spinner.hide();
              this.firstTimeLoadingCities = false;
            }
            else {
              // If user has cities, calls next in BehaviorSubject so 
              // next iteration above userCities.length is true.
              this.sharedHomeService.userCities.next(res);
            }
          },
          (err) => {
            console.log("Error getCitites@HomeComponent: ");
            console.log(err);
            this.spinner.hide();
          }
        );
      }
    })
  }

  ngOnDestroy() {
    if (this.citiesSubscription) {
      this.citiesSubscription.unsubscribe();
    }
    if (this.userCitiesSubscription) {
      this.userCitiesSubscription.unsubscribe();
    }
  }

}
