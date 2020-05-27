import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { City } from '../models/city.model';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private baseURL = environment.apiUrl + 'weatherapp/cities';

  constructor(private weatherService: WeatherService, private http: HttpClient, private authService: AuthService) { }

  getCityDetails(slug: string): Observable<City> {
    let headers = this.authService.setHeaders();
    return this.http.get<City>(`${this.baseURL}`, {
      params: {
        slug: slug
      },
      headers: headers
    })
      .pipe(map(data => {
        return data['city'];
      }));
  }

  getCities(): Observable<City[]> {
    let headers = this.authService.setHeaders();
    return this.http.get<City[]>(`${this.baseURL}/all`, { headers: headers })
      .pipe(map(data => {
        return data['cities'];
      }));
  }

  addNewCity(city: City): Observable<Object>{
    
    return this.weatherService.getWeatherInfoCity(city).pipe(
      mergeMap(cityWeather => {
        let headers = this.authService.setHeaders();
        return this.http.post(`${this.baseURL}/add`, {
        name: cityWeather.name,
        country: cityWeather.country,
        countryCode: cityWeather.countryCode
        }, { headers: headers })
      })
    )

    // let headers = this.authService.setHeaders();
    // return this.http.post(`${this.baseURL}/add`, {
    //     name: city.name,
    //     country: city.country,
    //     countryCode: city.countryCode
    // }, { headers: headers })
  }


}
