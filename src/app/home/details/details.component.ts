import { Component, OnInit, } from '@angular/core';
import { City } from 'src/app/shared/models/city.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {

  
  city: City = {
    id: 3688689,
    name: "Bogotá",
    country: "CO",
    desc: "Clouds",
    icon: "01d",
    main:{
      temp: 17,
      temp_min: 17,
      temp_max: 17,
      humidity: 59,
      windspeed: 4.6
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
