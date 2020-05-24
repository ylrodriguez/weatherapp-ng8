import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/shared/models/city.model';
import { CityService } from 'src/app/shared/services/city.service';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.sass']
})
export class CitiesComponent implements OnInit {

  cities: City[] = [];
  finishedLoadingCities: boolean = false;

  constructor(private cityService: CityService, private weatherService: WeatherService) { }

  ngOnInit() {
    this.cityService.getCities().subscribe(
      (res) => {
        console.log(res);
        this.getInfoCitiesInOrder(res, 0, Object.keys(res).length);
      },
      (err) => {
        console.log("Error getCitites@HomeComponent: " + err)
      }
    );
  }

  /**
   * Recursive function that waits until an observable finishes
   * to begin with next iteration. This is to have the data in the same
   * order.
   */
  getInfoCitiesInOrder(resCities: City[], index: number, lengthCities: number) {
    this.weatherService.getWeatherInfoCity(resCities[index]).subscribe(
      (res) => {
        this.cities.push(res)
        if (index < (lengthCities - 1)) {
          index++;
          this.getInfoCitiesInOrder(resCities, index, lengthCities)
        }
        else {
          this.finishedLoadingCities = true
        }
      },
      (err) => {
        console.log("Error getInfoCitiesInOrder@CitiesComponent: " + err)
        console.log(err)
        if (index < (lengthCities - 1)) {
          index++;
          this.getInfoCitiesInOrder(resCities, index, lengthCities)
        }
        else{
          this.finishedLoadingCities = true
        }
      }
    );
  }


}
