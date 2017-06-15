import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WeatherProvider {

  constructor(public http: Http) {
    console.log('Hello WeatherProvider Provider');
  }
  getWeather(days, coord): Observable<any> {
    let endpoint = "http://api.openweathermap.org/data/2.5/forecast/daily"
    let headers = new Headers({ "content-type": 'application/json',
                                "Access-Control-Expose-Headers" : "Authorization" });

    let searchParams = new URLSearchParams()
    searchParams.set('lat', coord.latitude);
    searchParams.set('lon', coord.longitude);
    searchParams.set('cnt', days);
    searchParams.set('APPID', 'c3ec8d1775bd91da4f6d7d7d6ae1a195')

    let options = new RequestOptions({
      headers: headers,
      search: searchParams
    });
    return this.http.get(endpoint, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
