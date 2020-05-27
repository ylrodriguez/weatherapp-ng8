import { Component, OnInit, Input } from '@angular/core';
import { City } from 'src/app/shared/models/city.model'
import { Router } from '@angular/router';
import { SharedHomeService } from 'src/app/shared/services/shared-home.service';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.sass']
})
export class CityCardComponent implements OnInit {

  @Input() city: City
  private weatherSubscription: any;
  canShowCityCard: boolean = false;

  constructor(private weatherService: WeatherService, private router: Router, private sharedHomeService: SharedHomeService) { }

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

}
