import { Component, OnInit, Input } from '@angular/core';
import { City } from 'src/app/shared/models/city.model'
import { Router } from '@angular/router';
import { SharedHomeService } from 'src/app/shared/services/shared-home.service';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.sass']
})
export class CityCardComponent implements OnInit {

  @Input() city: City

  constructor(private router: Router, private sharedHomeService: SharedHomeService) { }

  ngOnInit() {
  }

  openDetailsCity(){
    this.sharedHomeService.citySelected = this.city;
    console.log("City")
    console.log(this.sharedHomeService.citySelected)
    this.router.navigate([`/details/${this.city.slug}`])
  }

}
