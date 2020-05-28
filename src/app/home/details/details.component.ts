import { Component, OnInit, OnDestroy } from '@angular/core';
import { City } from 'src/app/shared/models/city.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'src/app/shared/services/city.service';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { SharedHomeService } from 'src/app/shared/services/shared-home.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {

  private detailsSubscription: any;
  private routeSubscription: any;
  canStartAnimation: boolean = false;

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

  constructor(private router: Router,private spinner: NgxSpinnerService, private route: ActivatedRoute, private cityService: CityService, private weatherService: WeatherService, private sharedHomeService: SharedHomeService) { }

  ngOnInit() {
    this.spinner.show();
    this.routeSubscription = this.route.params.subscribe(params => {
      var slug = params['slug'];
      // There's a citySelected previously requested
      if (this.sharedHomeService.citySelected && this.sharedHomeService.citySelected.slug == slug) {
        this.city = this.sharedHomeService.citySelected
        this.getForecastInfo(this.city);
        this.addBackground();
        this.spinner.hide();
        this.canStartAnimation = true;
      }
      else {
        this.detailsSubscription = this.cityService.getCityDetails(slug).subscribe(
          (res) => {
            if(!res){
              this.router.navigate(['/'])
            }
            this.getWeatherInfo(res);
            this.getForecastInfo(res);
          },
          (err) => {
            console.log("Error ngOnInit@DetailsComponent: ");
            console.log(err);
            this.spinner.hide();
            this.canStartAnimation = true;
          }
        )
      }
    })
  }

  getWeatherInfo(res: City) {
    this.detailsSubscription = this.weatherService.getWeatherInfoCity(res).subscribe(
      (res) => {
        this.city = res;
        this.addBackground();
        this.spinner.hide();
        this.canStartAnimation = true;
      },
      (err) => {
        console.log("Error getWeatherInfo@DetailsComponent: ");
        console.log(err);
        this.spinner.hide();
        this.canStartAnimation = true;
      }
    );
  }

  getForecastInfo(res: City){
    this.detailsSubscription = this.weatherService.getWeatherForecast(res).subscribe(
      (res) => {
        this.city = res;
      },
      (err) => {
        console.log("Error getForecastInfo@DetailsComponent: ");
        console.log(err);
        this.spinner.hide();
        this.canStartAnimation = true;
      }
    )
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
    if (this.detailsSubscription) {
      this.detailsSubscription.unsubscribe();
    }
  }

}
