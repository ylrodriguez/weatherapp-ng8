import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { City } from '../models/city.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private baseURL = environment.apiUrl + 'weatherapp/cities';

  constructor(private http: HttpClient, private authService: AuthService) { }

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

  addNewCity(city: City) {
    let headers = this.authService.setHeaders();
    return this.http.post(`${this.baseURL}/add`, {
        name: city.name,
        country: city.country,
        countryCode: city.countryCode
    }, { headers: headers })
  }


}
