import { Injectable } from '@angular/core';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class SharedHomeService {

  private _citySelected: City;
  private _userCities: City[];
  constructor() { }

  get citySelected(){
    return this._citySelected;
  }

  set citySelected(city: City){
    this._citySelected = city;
  }

  get userCities(){
    return this._userCities;
  }

  set userCities(cities: City[]){
    this._userCities = cities;
  }
}
