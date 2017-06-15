import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the EventFetcherProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventFetcherProvider {
  data: Array<Object>;
  event_api_url = "http://smartcityeventapi.azurewebsites.net/api/events"
  server_url = "";
  constructor(public http: Http) {
    console.log('Hello EventFetcherProvider Provider');
  }


  load():Promise<Array<Object>> {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve =>{
        this.http.get(this.event_api_url)
        .map(res=> res.json())
        .subscribe(data=>{
          this.data = data.events;
          resolve(this.data);
        })
    })

  }

}
