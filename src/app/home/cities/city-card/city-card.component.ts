import { Component, OnInit, Input } from '@angular/core';
import { City } from 'src/app/shared/models/city.model'

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.sass']
})
export class CityCardComponent implements OnInit {

  @Input() city: City;

  constructor() { }

  ngOnInit() {
  }

}
