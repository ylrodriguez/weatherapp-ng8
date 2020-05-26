import { Injectable } from '@angular/core';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class SharedHomeService {

  private _citySelected: City;
  constructor() { }

  get citySelected(){
    return this._citySelected;
  }

  set citySelected(city: City){
    this._citySelected = city;
  }
}
