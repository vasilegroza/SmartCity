import { Component, Input} from '@angular/core';

/**
 * Generated class for the WeatherComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'weather',
  templateUrl: 'weather.html',
  inputs:['dayForecast']
})
export class WeatherComponent {

  @Input() dayForecast;
  @Input() indexToUse;
  day: any;
  index: number;
  constructor() {
  }
  ngOnInit(){
    console.log(this.dayForecast);
    this.day = this.dayForecast;
    this.index = this.indexToUse;

  }
}

// <weather></weather
