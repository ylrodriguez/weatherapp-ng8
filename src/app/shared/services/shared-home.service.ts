import { Injectable } from '@angular/core';
import { City } from '../models/city.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedHomeService {

  private _citySelected: City;
  private _userCities= new BehaviorSubject<City[]>([]);
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

  addCityToUsersCity(city: City){
    const currentValue = this._userCities.getValue();
    const updatedValue = [...currentValue, city];
    this._userCities.next(updatedValue);
  }
  
}
