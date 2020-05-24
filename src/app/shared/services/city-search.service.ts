import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CitySearchService {

  private baseURL = 'http://geodb-free-service.wirefreethought.com/v1/geo/';

  constructor(private http: HttpClient) { }

  searchCities(query: string): Observable<City[]> {
    return this.http.get(`${this.baseURL}/cities`, {
      params: {
        namePrefix: query,
        limit: '5',
        types: 'city',
        sort: '-population,name'
      },
    })
      .pipe(map(data => {
        var citiesFound: City[] = [];

        for (let cityData of data["data"]) {
          let city: City = { name: "", countryCode: "" };
          city.name = cityData["name"];
          city.country = cityData["country"];
          city.countryCode = cityData["countryCode"];
          citiesFound.push(city);
        }

        return citiesFound;
      }));
  }
}
