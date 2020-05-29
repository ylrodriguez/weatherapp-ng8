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

  cleanUsersCity(){
    this._userCities.next([]);
  }

  addCityToUsersCity(city: City){
    const currentValue = this._userCities.getValue();
    const updatedValue = [...currentValue, city];
    updatedValue["function"] = "add"
    this._userCities.next(updatedValue);
  }

  removeCityToUsersCities(city: City){
    const updatedValue = this._userCities.getValue().filter(
      item => item.id != city.id
    )
    updatedValue["function"] = "remove"
    this._userCities.next(updatedValue);
  }
  
}
