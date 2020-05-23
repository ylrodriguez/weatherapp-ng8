import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { City } from '../models/city.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private baseURL = environment.apiUrl + 'city';

  constructor(private http: HttpClient) { }
  
  getCityDetails(slug: string): Observable<City>{
    return this.http.get<City>(`${this.baseURL}` , {
      params: {
        slug: slug
      }
    })
      .pipe(map(data => {
        return data;
      }));
  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.baseURL}/all`)
      .pipe(map(data => {
        return data['cities'];
      }));
  }


}
