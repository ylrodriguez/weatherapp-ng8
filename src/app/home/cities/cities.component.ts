import { Component, OnInit, OnDestroy } from '@angular/core';
import { City } from 'src/app/shared/models/city.model';
import { CityService } from 'src/app/shared/services/city.service';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.sass']
})
export class CitiesComponent implements OnInit {

  private citiesSubscription: any;
  cities: City[] = [];

  constructor(private cityService: CityService, private weatherService: WeatherService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.citiesSubscription = this.cityService.getCities().subscribe(
      (res) => {
        this.getInfoCitiesInOrder(res, 0, Object.keys(res).length);
      },
      (err) => {
        console.log("Error getCitites@HomeComponent: ");
        console.log(err);
      }
    );
  }

  /**
   * Recursive function that waits until an observable finishes
   * to begin with next iteration. This is to have the data in the same
   * order.
   */
  getInfoCitiesInOrder(resCities: City[], index: number, lengthCities: number) {
    this.citiesSubscription = this.weatherService.getWeatherInfoCity(resCities[index]).subscribe(
      (res) => {
        // First iteration
        if(index == 0){
          this.spinner.hide();
        }
        this.cities.push(res)
        if (index < (lengthCities - 1)) {
          index++;
          this.getInfoCitiesInOrder(resCities, index, lengthCities)
        }
        else {
          this.spinner.hide();
        }
      },
      (err) => {
        console.log("Error getInfoCitiesInOrder@CitiesComponent: ")
        console.log(err)
        if (index < (lengthCities - 1)) {
          index++;
          this.getInfoCitiesInOrder(resCities, index, lengthCities)
        }
        else {
          this.spinner.hide();
        }
      }
    );
  }

  ngOnDestroy() {
    this.citiesSubscription.unsubscribe();
  }


}
