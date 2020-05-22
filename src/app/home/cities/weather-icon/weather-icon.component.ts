import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.sass']
})
export class WeatherIconComponent implements OnInit {
  @Input() state = ""
  constructor() { }

  ngOnInit() {
  }

}
