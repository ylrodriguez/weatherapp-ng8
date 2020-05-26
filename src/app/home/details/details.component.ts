import { Component, OnInit, OnDestroy } from '@angular/core';
import { City } from 'src/app/shared/models/city.model';
import { ActivatedRoute } from '@angular/router';
import { CityService } from 'src/app/shared/services/city.service';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {

  private detailsSubscription: any;
  private routeSubscription: any;

  city: City = {
    id: 3688689,
    name: " ",
    countryCode: " ",
    desc: " ",
    icon: "01d",
    main: {
      temp: 17,
      temp_min: 17,
      temp_max: 17,
      humidity: 59,
      windspeed: 4.6
    }
  }

  linearGradient: string = "linear-gradient(rgba(57, 38, 68, 0.8), rgba(89, 89, 89, 0.65))";

  constructor(private route: ActivatedRoute, private cityService: CityService, private weatherService: WeatherService) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      var slug = params['slug'];
      this.detailsSubscription = this.cityService.getCityDetails(slug).subscribe(
        (res) => {
          if (res.main) {
            this.city = res
            this.addBackground();
          }
          else {
            this.getWeatherInfo(res);
          }
        },
        (err) => {
          console.log("Error ngOnInit@DetailsComponent: ");
          console.log(err);
        }
      )
    })
  }

  getWeatherInfo(res: City) {
    this.detailsSubscription = this.weatherService.getWeatherInfoCity(res).subscribe(
      (res) => {
        this.city = res;
        this.addBackground();
      },
      (err) => {
        console.log("Error getWeatherInfo@DetailsComponent: ");
        console.log(err);
      }
    );
  }

  addBackground() {
    var imgUrl = this.city.imgUrl;
    var cssExpression
    if (imgUrl) {
      cssExpression = {
        'background-image': `${this.linearGradient},url('${imgUrl}')`
      }
    }
    else {
      imgUrl = "content/img/bg-city-details.jpg"
      cssExpression = {
        'background-image': `${this.linearGradient},url(${imgUrl})`
      }
    }
    return cssExpression;
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.detailsSubscription.unsubscribe();
  }

}
