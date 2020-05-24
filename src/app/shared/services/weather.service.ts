import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private baseURL = 'http://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'a331b4942fe047524203b7bf57155633'

  constructor(private http: HttpClient) { }

  getWeatherInfoCity(city: City): Observable<City> {
    return this.http.get(this.baseURL, {
      params: {
        q: `${city.name},${city.countryCode}`,
        appid: this.apiKey,
        units: 'metric'
      },
    })
      .pipe(map(data => {
        city['bestName'] = data['name'];
        city['desc'] = data['weather'][0].main;
        city['icon'] = data['weather'][0].icon;

        let main = {
          temp: Math.round(data['main'].temp),
          temp_min: Math.round(data['main'].temp_min),
          temp_max: Math.round(data['main'].temp_max),
          humidity: Math.round(data['main'].humidity),
          windspeed: Math.round(data['wind'].speed),
        }

        city['main'] = main;

        return city;
      }));
  }
}
